import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRoutes from "./routes/index.js";
import logger, { logError } from "./utils/logger.js";
import expressInit from "./expressInit.js";
dotenv.config();
const PORT = process.env.PORT || 4000;

export const app = express();

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

expressInit(app);

app.use(logger);

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is healthy 🚀" });
});

const API_VERSION = process.env.API_VERSION || "v1";
registerRoutes(app, API_VERSION);

// 404 capture
app.use((req, res, next) => {
  const err = new Error(`${req.originalUrl} Not found`);
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  logError(err);
  res.status(status).json({
    status,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Try to visit http://localhost:${PORT}/api/health`);
});
