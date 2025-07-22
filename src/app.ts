import Fastify from "fastify";
import productRoutes from "./routes/products.route.js";
import adjustmentRoutes from "./routes/adjustments.route.js";

const app = Fastify({ logger: true });

app.register(productRoutes, { prefix: "/products" });
app.register(adjustmentRoutes, { prefix: "/adjustments" });

export default app;
