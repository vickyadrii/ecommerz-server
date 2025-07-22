import { FastifyInstance } from "fastify";
import { getAdjustments, getAdjustmentById, createAdjustment, updateAdjustment, deleteAdjustment } from "../controllers/adjustments.controller.js";

export default async function adjustmentRoutes(fastify: FastifyInstance) {
  fastify.get("/", getAdjustments);
  fastify.get("/:id", getAdjustmentById);
  fastify.post("/", createAdjustment);
  fastify.put("/:id", updateAdjustment);
  fastify.delete("/:id", deleteAdjustment);
}
