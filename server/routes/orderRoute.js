import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToOrder, getAllOrder } from "../controller/order.js";
const router = express.Router();
router.post("/add-to-order", authMiddleware, addToOrder);
router.get("/get-all-order", getAllOrder);
export default router;
