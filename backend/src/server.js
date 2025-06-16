import express from "express";
import { ENV } from "./config/environment.js";

const app = express();

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
