import { errorMessage } from "../errorMessage.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).send(newOrder);
  } catch (error) {
    next(errorMessage(500, "建立訂單失敗，請確認格式", error));
  }
};
export const getOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getOrder = await Order.findById(id);
    res.status(200).json(getOrder);
  } catch (error) {
    next(errorMessage(500, "查詢失敗，請確認是否有此id", error));
  }
};
export const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    next(
      errorMessage(
        500,
        "修改失敗，請確認是否有其id與是否欄位輸入格式正確",
        error
      )
    );
  }
};
export const deleteOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    await Order.findByIdAndDelete(orderId);
    res.status(200).json("成功刪除訂單資訊");
  } catch (error) {
    next(errorMessage(500, "刪除失敗，找不到訂單id", e));
  }
};
export const getAllOrders = async (req, res, next) => {
  try {
    const getAllOrders = await Order.find();
    res.status(200).json(getAllOrders);
  } catch (error) {
    next(errorMessage(500, "搜尋失敗", error));
  }
};
