import express from "express";
import { ENV } from "./config/environment.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = ENV.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
