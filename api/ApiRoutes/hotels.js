import express from "express";
import { verifyAdmin } from "../JWT_Token.js";
import {
  getAllHotel,
  createHotel,
  deleteHotel,
  getHotel,
  updateHotel,
  amountOfType,
  amountOfCities
} from "../RouterController/hotel.js";

const router = express.Router();

//查閱all hotel資料
router.get("/", getAllHotel);
//新增hotel資料
router.post("/", verifyAdmin, createHotel);

//獲得指定id的hotel資料
router.get("/find/:id", getHotel);

//將指定id資料做修改練習
router.put("/:id", verifyAdmin, updateHotel);

//刪除資料
router.delete("/:id", verifyAdmin, deleteHotel);

//依照“住宿類型瀏覽”的種類資料統計與分析
router.get("/amountoftype", amountOfType)

//要來做"依住宿城市瀏覽"的種類資料統計與分析
router.get("/amountofcities", amountOfCities)


export default router;
