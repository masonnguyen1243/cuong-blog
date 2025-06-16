import express from "express";
import { ENV } from "./config/environment.js";
import { connectDB } from "./config/db.js";
import { initRoutes } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = ENV.PORT;

initRoutes(app);

connectDB();

app.get("/status", (req, res) => {
  res.json("API is working!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
