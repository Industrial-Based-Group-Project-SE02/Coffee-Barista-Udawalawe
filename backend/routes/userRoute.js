import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  createUser,
  loginUser,
  getAllUsers,
  toggleUserBlock,
  userCount,
  UpdateProfile,
  viewDetails,
  isAdmin,
  isCoustomer,
  isCashier,
  isCrew
} from "../controllers/userController.js";

dotenv.config();

const userRouter = express.Router();


/* =========================
   AUTH MIDDLEWARE
========================= */

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

/* =========================
   ROLE MIDDLEWARE
========================= */

const adminOnly = (req, res, next) => {
  if (!isAdmin(req)) {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }
  next();
};

const customerOnly = (req, res, next) => {
  if (!isCoustomer(req)) {
    return res.status(403).json({
      success: false,
      message: "Customer access required"
    });
  }
  next();
};

const cashierOnly = (req, res, next) => {
  if (!isCashier(req)) {
    return res.status(403).json({
      success: false,
      message: "Cashier access required"
    });
  }
  next();
};

const crewOnly = (req, res, next) => {
  if (!isCrew(req)) {
    return res.status(403).json({
      success: false,
      message: "Crew access required"
    });
  }
  next();
};

/* =========================
   PUBLIC ROUTES
========================= */

// PUBLIC
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/test", (req, res) => res.json({ ok: true }));

// PROTECTED FIXED PATHS
userRouter.get("/check/admin", verifyToken, (req, res) => res.json({ success: true, isAdmin: isAdmin(req) }));
userRouter.get("/check/customer", verifyToken, (req, res) => res.json({ success: true, isCustomer: isCoustomer(req) }));
userRouter.get("/check/cashier", verifyToken, (req, res) => res.json({ success: true, isCashier: isCashier(req) }));
userRouter.get("/check/crew", verifyToken, (req, res) => res.json({ success: true, isCrew: isCrew(req) }));

userRouter.get("/count", verifyToken, adminOnly, userCount);
userRouter.get("/", verifyToken, adminOnly, getAllUsers);
userRouter.put("/profile/:email", verifyToken, UpdateProfile);
userRouter.patch("/block/:email", verifyToken, adminOnly, toggleUserBlock);

// DYNAMIC (KEEP LAST)
userRouter.get("/:email", verifyToken, viewDetails);


export default userRouter;
