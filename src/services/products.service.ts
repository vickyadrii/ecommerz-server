import { db } from "../db.js";
import { Query } from "../types/index.js";

export const findAll = async (query: Query) => {
  const page = query.page ? query.page : 1;
  const limit = query.limit ? query.limit : 10;
  const offset = (page - 1) * limit;

  return db.any("SELECT * FROM products ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset]);
};

export const findBySku = async (sku: string) => {
  return db.oneOrNone("SELECT * FROM products WHERE sku=$1", [sku]);
};

export const create = async (data: any) => {
  const { title, sku, thumbnail_url, price, description, stock } = data;
  return db.one("INSERT INTO products(title, sku, thumbnail_url, price, description, stock) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [title, sku, thumbnail_url, price, description, stock]);
};

export const update = async (sku: string, data: any) => {
  const { title, thumbnail_url, price, description, stock } = data;
  return db.oneOrNone("UPDATE products SET title=$1, thumbnail_url=$2, price=$3, description=$4, stock=$5 WHERE sku=$6 RETURNING *", [title, thumbnail_url, price, description, stock, sku]);
};

export const remove = async (sku: string) => {
  return db.none("DELETE FROM products WHERE sku=$1", [sku]);
};

export const importFromDummy = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const { products } = (await res.json()) as any;

  let count = 0;
  for (const p of products) {
    const exist = await findBySku(`DUMMY-${p.id}`);
    if (!exist) {
      await create({
        title: p.title,
        sku: `DUMMY-${p.id}`,
        thumbnail_url: p.thumbnail,
        price: p.price,
        stock: p.stock,
        description: p.description,
      });
      count++;
    }
  }
  return count;
};
