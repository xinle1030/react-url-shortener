import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const app = express();

// cors for cross origin requesters to the frontend application
app.use(cors());

connectDB();

import indexRouter from "./routes/index.js";
import urlsRouter from "./routes/urls.js";
import shortUrlsRouter from "./routes/short_urls.js";
import metricsRouter from "./routes/metrics.js";
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", shortUrlsRouter);
app.use("/api/urls", urlsRouter);
app.use("/api/metrics", metricsRouter);
app.use("/", indexRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
}
export default app;
