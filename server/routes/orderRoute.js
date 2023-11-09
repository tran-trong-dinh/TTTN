import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToOrder, getAllOrder, statistical } from "../controller/order.js";
const router = express.Router();
router.post("/add-to-order", authMiddleware, addToOrder);
router.get("/get-all-order", getAllOrder);
router.get("/statistical", statistical);
export default router;
