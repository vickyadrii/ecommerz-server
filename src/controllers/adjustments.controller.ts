import { FastifyRequest, FastifyReply } from "fastify";
import * as adjService from "../services/adjustments.service.js";
import { error, success } from "../utils/response.js";
import { Query } from "../types/index.js";

export const getAdjustments = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const list = await adjService.findAll(req.query as Query);
    return reply.send(success(list, "Adjustments fetched successfully"));
  } catch (err) {
    console.error("Error fetching products:", err);
    return reply.status(500).send(error("Failed to fetch products"));
  }
};

export const getAdjustmentById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = req.params as { id: string };
    const adj = await adjService.findById(Number(id));
    if (!adj) return reply.status(404).send(error("Adjustment not found"));
    return reply.send(success(adj, "Adjustment fetched successfully"));
  } catch (err) {
    console.error("Error fetching adjustment by ID:", err);
    return reply.status(500).send(error("Failed to fetch adjustment"));
  }
};

export const createAdjustment = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const adj = await adjService.create(req.body as any);
    return reply.status(201).send(success(adj, "Adjustment created successfully"));
  } catch (err) {
    console.error("Error creating adjustment:", err);
    return reply.status(500).send(error("Failed to create adjustment"));
  }
};

export const updateAdjustment = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const adjData = req.body as any;

  try {
    const updatedAdj = await adjService.update(Number(id), adjData);
    if (!updatedAdj) {
      return reply.status(404).send(error("Adjustment not found"));
    }
    return reply.send(success(updatedAdj, "Adjustment updated successfully"));
  } catch (err) {
    console.error("Error updating adjustment:", err);
    return reply.status(500).send(error("Failed to update adjustment"));
  }
};

export const deleteAdjustment = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };

  try {
    const adj = await adjService.findById(Number(id));
    if (!adj) {
      return reply.status(404).send(error("Adjustment not found"));
    }
    await adjService.remove(Number(id));
    return reply.send(success(null, "Adjustment deleted successfully"));
  } catch (err) {
    console.error("Error deleting adjustment:", err);
    return reply.status(500).send(error("Failed to delete adjustment"));
  }
};
