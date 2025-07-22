import { FastifyRequest, FastifyReply } from "fastify";
import * as productService from "../services/products.service.js";
import { Query } from "../types/index.js";
import { success, error } from "../utils/response.js";

export const getProducts = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await productService.findAll(req.query as Query);
    return reply.send(success(products, "Products fetched successfully"));
  } catch (err) {
    console.error("Error fetching products:", err);
    return reply.status(500).send(error("Failed to fetch products"));
  }
};

export const getProductBySku = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sku } = req.params as { sku: string };
    const product = await productService.findBySku(sku);
    if (!product) return reply.status(404).send(error("Product not found"));
    return reply.send(success(product, "Product fetched successfully"));
  } catch (err) {
    console.error("Error fetching product by SKU:", err);
    return reply.status(500).send(error("Failed to fetch product"));
  }
};

export const createProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const product = await productService.create(req.body as any);
  if (!product) {
    return reply.status(400).send(error("Failed to create product"));
  }
  return reply.status(201).send(success(product, "Product created successfully"));
};

export const updateProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sku } = req.params as { sku: string };
  const productData = req.body as any;

  try {
    const updatedProduct = await productService.update(sku, productData);
    console.log("Updated Product:", updatedProduct);
    if (!updatedProduct) {
      return reply.status(404).send(error("Product not found"));
    }
    return reply.send(success(updatedProduct, "Product updated successfully"));
  } catch (err) {
    console.error("Error updating product:", err);
    return reply.status(500).send(error("Failed to update product"));
  }
};

export const deleteProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { sku } = req.params as { sku: string };

  try {
    const product = await productService.findBySku(sku);
    if (!product) {
      return reply.status(404).send(error("Product not found"));
    }

    await productService.remove(sku);
    return reply.send(success(null, "Product deleted successfully"));
  } catch (err) {
    console.error("Error deleting product:", err);
    return reply.status(500).send(error("Failed to delete product"));
  }
};

export const importDummyProducts = async (_req: FastifyRequest, reply: FastifyReply) => {
  try {
    const count = await productService.importFromDummy();
    return reply.send(success(null, `${count} dummy products imported successfully`));
  } catch (err) {
    console.error("Error importing dummy products:", err);
    return reply.status(500).send(error("Failed to import dummy products"));
  }
};
