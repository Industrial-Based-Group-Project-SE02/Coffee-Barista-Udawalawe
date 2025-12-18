import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./routes/userRoute.js";

// Add this import near other route imports

import path from "path"; // Add this import
import { fileURLToPath } from 'url'; // Add this import for ES modules
import blogRoutes from './routes/blogRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// After other routes




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple ping route for health checks
app.get('/ping', (req, res) => res.send('pong'));

// JWT middleware (optional token)
app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if (tokenString) {
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (!err) req.user = decoded;
      else console.error("Invalid token:", err.message);
      next();
    });
  } else {
    next();
  }
});

// Routes
app.use("/api/users", userRouter);
app.use('/api/blogs', blogRoutes);
// feedback routes (admin + public)
app.use('/api/feedbacks', feedbackRoutes);
console.log('🔗 Feedback routes mounted');
console.log('🔍 feedbackRoutes type:', typeof feedbackRoutes, 'hasStack:', !!(feedbackRoutes && feedbackRoutes.stack));

// DB + server start
console.log("📡 Attempting MongoDB connection...");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("📊 Database:", mongoose.connection.db.databaseName);

    // Debug route to list registered routes
    app.get('/__routes', (req, res) => {
      try {
        const routes = app._router.stack
          .filter(r => r.route)
          .map(r => Object.keys(r.route.methods).map(m => m.toUpperCase() + ' ' + r.route.path).join(', '));
        res.json({ routes });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
      console.log("📝 Test blog creation: POST http://localhost:3000/api/blogs");

      // Immediately log registered routes for debugging
      try {
        const routes = app._router && app._router.stack
          ? app._router.stack
              .filter(r => r.route)
              .map(r => Object.keys(r.route.methods).map(m => m.toUpperCase() + ' ' + r.route.path).join(', '))
          : [];
        console.log('🛣️ Registered routes:', routes);
      } catch (e) {
        console.error('Error listing routes:', e.message);
      }

      // Re-check after a short delay (some middleware may register routes slightly later)
      setTimeout(() => {
        try {
          const routes2 = app._router && app._router.stack
            ? app._router.stack
                .filter(r => r.route)
                .map(r => Object.keys(r.route.methods).map(m => m.toUpperCase() + ' ' + r.route.path).join(', '))
            : [];
          console.log('🛣️ Registered routes (delayed):', routes2);
        } catch (err) {
          console.error('Error listing routes on delayed check:', err.message);
        }
      }, 1000);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed:", err.message);
  });

  
