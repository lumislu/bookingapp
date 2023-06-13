import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../RouterController/order.js";

const router = express.Router();
//新增訂單
router.post("/", createOrder);
//找到id訂單
router.get("/find/:id", getOrder);
//修改id訂單
router.put("/:id", updateOrder);
//刪除id訂單
router.delete("/:id", deleteOrder);
//獲取所有訂單
router.get("/", getAllOrders);

export default router;
