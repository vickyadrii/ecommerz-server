import { db } from "../db.js";

export const findAll = async (query: any) => {
  const { page = 1, limit = 10 } = query;
  const offset = (page - 1) * limit;
  return db.any("SELECT * FROM adjustments ORDER BY id DESC LIMIT $1 OFFSET $2", [limit, offset]);
};

export const findById = async (id: number) => {
  return db.oneOrNone("SELECT * FROM adjustments WHERE id=$1", [id]);
};

export const create = async (data: any) => {
  const { sku, qty } = data;
  const product = await db.one("SELECT price FROM products WHERE sku=$1", [sku]);
  const amount = product.price * qty;

  await db.none("UPDATE products SET stock = stock + $1 WHERE sku = $2", [qty, sku]);

  return db.one("INSERT INTO adjustments(sku, qty, amount) VALUES($1,$2,$3) RETURNING *", [sku, qty, amount]);
};

export const update = async (id: number, data: any) => {
  const { qty } = data;

  const existing = await findById(id);
  if (!existing) throw new Error("Adjustment not found");

  const diff = qty - existing.qty;

  const product = await db.one("SELECT price FROM products WHERE sku=$1", [existing.sku]);
  const amount = product.price * qty;

  await db.none("UPDATE products SET stock = stock + $1 WHERE sku = $2", [diff, existing.sku]);

  return db.one("UPDATE adjustments SET qty=$1, amount=$2 WHERE id=$3 RETURNING *", [qty, amount, id]);
};

export const remove = async (id: number) => {
  const existing = await findById(id);
  if (!existing) throw new Error("Adjustment not found");

  await db.none("UPDATE products SET stock = stock - $1 WHERE sku = $2", [existing.qty, existing.sku]);

  return db.none("DELETE FROM adjustments WHERE id=$1", [id]);
};
