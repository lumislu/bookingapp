import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const updateUserNameWrong = await User.findOne({ username: body.username });
  const updateEmailWrong = await User.findOne({ email: body.email });
  const originalUser = await User.findById(id); // 找到原本要更新得使用者資料
  if (updateUserNameWrong && updateUserNameWrong.id != originalUser.id)
    return next(errorMessage(400, "錯誤，此名稱已使用"));
  if (updateEmailWrong && updateEmailWrong.id != originalUser.id)
    return next(errorMessage(400, "錯誤，此信箱已使用"));
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (e) {
    next(errorMessage(500, "查無此id", e));
  }
};
export const deletedUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("成功刪除用戶");
  } catch (e) {
    next(errorMessage(500, "刪除失敗", e));
  }
};
export const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const getUser = await User.findById(userId);
    res.status(200).json(getUser);
  } catch (e) {
    next(errorMessage(500, "查無此id", e));
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json(getAllUser);
  } catch (e) {
    next(errorMessage(500, "讀取全部用戶失敗", e));
  }
};
