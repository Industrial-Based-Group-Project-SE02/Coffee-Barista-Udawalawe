import express from "express";
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


// PUBLIC
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUsers", getAllUsers);
userRouter.put("/blocked/:email", toggleUserBlock);
userRouter.get("/countUsers", userCount);
userRouter.put("/updateProfile/:email", UpdateProfile);
userRouter.get("/getProfile/:email", viewDetails);



export default userRouter;
