import express from "express";
import {
  signup,
  login,
  getUsers,
  deleteUser,
} from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.delete("/users/:id", authMiddleware, deleteUser);
export default router;