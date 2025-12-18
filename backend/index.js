import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import reservationRouter from "./routes/reservationRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// JWT middleware (MUST be before routes)
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
  }

  next();
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/reservations", reservationRouter);

// Error handler (last)
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

// DB + server start (ONLY ONE LISTEN)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  })
  .catch((err) => {
    console.log("Mongo connection error:", err.message);
  });
