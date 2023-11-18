import express from "express";
import {
  createPromotion,
  deletePromotion,
  getPromotion,
  getPromotions,
  updatePromotion,
} from "../controller/promotion.js";

const router = express.Router();

router.post("/create-promotion", createPromotion);
router.get("/get-promotions", getPromotions);
router.get("/get-promotion/:id", getPromotion);
router.post("/update-promotion/:id", updatePromotion);
router.delete("/delete-promotion/:id", deletePromotion);

export default router;
