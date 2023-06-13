import { errorMessage } from "../errorMessage.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const registerData = req.body;
  // console.log(registerData);
  try {
    const registerWrong =
      (await User.findOne({ username: registerData.username })) ||
      (await User.findOne({ email: registerData.email }));
    if (registerWrong) return next(errorMessage(400, "錯誤，此帳號或信箱已被註冊"));
    //確認是否重複註冊
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(registerData.password, salt);


    //使用bcrypt加密
    const newUser = new User({
      username: registerData.username,
      email: registerData.email,
      password: hash,
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (e) {
    next(errorMessage(500, "註冊失敗", e));
    
  }
};
export const login = async (req, res, next) => {
  const loginData = req.body;
  try {
    const userData =
      (await User.findOne({ username: loginData.account })) ||
      (await User.findOne({ email: loginData.account }));
    if (!userData) return next(errorMessage(400, "沒有此使用者"));
    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      userData.password
    );
    if (!isPasswordCorrect) return next(errorMessage(400, "輸入密碼錯誤"));
    //確認是否已註冊

    //登入後產生一個專屬此用戶的token憑證
    const token = jwt.sign(
      { id: userData._id, isAdmin: userData.isAdmin },
      process.env.JWT
    );
    res
      .cookie("JWT_token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (e) {
    next(errorMessage(500, "登入失敗"))
  }
};
