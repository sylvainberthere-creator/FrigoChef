import dotenv from "dotenv";

import app from "./app";
import { connectDB } from "./config/connection";
dotenv.config();

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
