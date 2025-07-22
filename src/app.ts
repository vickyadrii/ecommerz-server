import Fastify from "fastify";
import cors from "@fastify/cors"; // ⬅️ tambahkan ini
import productRoutes from "./routes/products.route.js";
import adjustmentRoutes from "./routes/adjustments.route.js";

const allowedOrigins = process.env.FRONTEND_URL?.split(",").map((origin) => origin.trim()) || [];
console.log("Allowed Origins:", allowedOrigins);

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: allowedOrigins,
  credentials: true,
});

app.register(productRoutes, { prefix: "/products" });
app.register(adjustmentRoutes, { prefix: "/adjustments" });

export default app;
