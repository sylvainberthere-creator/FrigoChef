import express from "express";
import fridgeRoutes from "./routes/fridge.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/fridge", fridgeRoutes);
app.use("/auth", authRoutes);


export default app;
