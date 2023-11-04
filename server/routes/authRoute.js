import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/auth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile", authMiddleware, updateProfile);
router.get("/get-all-users", getAllUsers);
router.delete("/delete-user/:id", deleteUser);

export default router;
