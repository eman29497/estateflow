import express from "express";
import {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
} from "../controllers/inquiryController";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();
router.post("/", createInquiry);
router.get("/", authMiddleware, getAllInquiries);
router.delete("/:id", authMiddleware, deleteInquiry);
export default router;