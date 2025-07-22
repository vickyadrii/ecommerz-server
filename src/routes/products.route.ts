import { FastifyInstance } from "fastify";
import { getProducts, getProductBySku, createProduct, updateProduct, deleteProduct, importDummyProducts } from "../controllers/products.controller.js";

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/", getProducts);
  fastify.get("/:sku", getProductBySku);
  fastify.post("/", createProduct);
  fastify.put("/:sku", updateProduct);
  fastify.delete("/:sku", deleteProduct);
  fastify.post("/import", importDummyProducts);
}
