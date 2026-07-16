import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", authMiddleware, createProperty);
router.put("/:id", authMiddleware, updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);
export default router;