import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import hotelsApiRoute from "./ApiRoutes/hotels.js";
import roomsApiRoute from "./ApiRoutes/rooms.js";
import usersApiRoute from "./ApiRoutes/users.js";
import authApiRoute from "./ApiRoutes/auth.js";

import orderApiRoute from "./ApiRoutes/order.js";
import cookieParser from "cookie-parser";

const app = express();

//連接mongodb
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to mongoDB");
  } catch (e) {
    console.log("Disconnected to mongoDB");
    console.log(e);
  }
};

//確認連線狀況
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB dicconnected!");
});

app.get("/", (req, res) => {
  res.send("hello 這裡是首頁");
});

//設置本地伺服器
const port = 8080;
app.listen(port, () => {
  connect();
  console.log(`app listening on port  ${port}`);
});

app.use(express.json());
app.use(cookieParser());
dotenv.config();
//middlewares
app.use("/api/v1/hotels", hotelsApiRoute);
app.use("/api/v1/rooms", roomsApiRoute);
app.use("/api/v1/users", usersApiRoute);
app.use("/api/v1/auth", authApiRoute);

app.use("/api/v1/order", orderApiRoute);

//如上方apiRoute傳接有問題，這邊回傳錯誤訊息
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "中間ApiRoute出錯";
  return res.status(errorStatus).json({
    status: errorStatus,
    Message: errorMessage,
  });
});
