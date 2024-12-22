import express from "express";
import authRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import { configDotenv } from "dotenv";
import { connectDB } from "./libs/db.js";
import cookieParser from "cookie-parser"; // Default import
import errorHandler from "./middlewares/error.middleware.js";
import ENV from "./configs/env.js";
import bodyParser from "body-parser";
import cors from "cors";
import { app, server } from "./libs/socket.js";
import path from "path";

configDotenv();

const __dirname = path.resolve();

// Increase the payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser()); // Using cookie-parser middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(errorHandler);

server.listen(ENV.PORT, () => {
  connectDB();
  console.log(`Server listening on ${ENV.PORT}`);
});
