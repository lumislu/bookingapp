import express from "express";
import { verifyAdmin, verifyUser } from "../JWT_Token.js";
import {
  createRoom,
  getRoom,
  getAllRooms,
  getHotelRooms,
  updatedRoom,
  deleteRoom,
  updatedRoomDates,
} from "../RouterController/room.js";

const router = express.Router();

//創建第一個room
router.post("/:hotelid", verifyAdmin, createRoom);
//更改room updatedRoom
router.put("/:id", verifyAdmin, updatedRoom);
//只更新上傳unavailableDates得資料
router.put("/reservationdates/:id", verifyUser, updatedRoomDates);

// //刪除room
router.delete("/:hotelid/:id", verifyAdmin, deleteRoom);

// //讀取單筆room 資料 不用hotelid
// //是因為會多此一舉roomid來抓
router.get("/:id", getRoom);

// //抓取rooms所有資料
router.get("/", getAllRooms);

// //抓取一個hotel 的rooms所有資料
router.get("/findHotel/:hotelid/", getHotelRooms);

export default router;
