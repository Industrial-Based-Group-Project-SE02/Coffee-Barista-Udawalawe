import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./routes/userRoute.js";
import reservationRouter from "./routes/reservationRoute.js";
import blogRouter from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    const tokenString = req.header("Authorization");

    if (tokenString) {
        const token = tokenString.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (!err) {
                req.user = decoded; // Attach decoded token to request
            } else {
                console.error("Invalid token:", err.message); // Log the error
            }
            next(); // Continue processing the request
        });
    } else {
        next(); // Proceed without a token (guest access)
    }
});


// Routes
app.use("/api/users", userRouter);
app.use("/api/reservations", reservationRouter);
app.use("/api/blogs", blogRouter);

// DB + server start
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => {
    console.log("Mongo connection error:", err.message);
  });

