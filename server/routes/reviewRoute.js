import express from "express";
import {
  createReview,
  deleteReview,
  getReviewsOfProduct,
  updateReview,
} from "../controller/review.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-review", authMiddleware, createReview);
router.get("/get-reviews-of-product/:id", getReviewsOfProduct);
router.post("/update-review/:id", updateReview);
router.delete("/delete-review/:id", deleteReview);

export default router;
