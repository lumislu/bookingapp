import { errorMessage } from "../errorMessage.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    //儲存進room資料庫
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { room: saveRoom._id },
      });
    } catch (e) {
      next(errorMessage(500, "找不到hotel id 無法上傳room更新", e));
    }
    res.status(200).json(saveRoom);
  } catch (e) {
    next(errorMessage(500, "room的上傳失敗，可能為格式錯誤", e));
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (e) {
    next(errorMessage(500, "搜尋失敗,查無此ID", e));
  }
};
export const getAllRooms = async (req, res, next) => {
  try {
    const getAllRooms = await Room.find();
    res.status(200).json(getAllRooms);
  } catch (e) {
    next(errorMessage(500, "搜尋失敗", e));
  }
};
export const getHotelRooms = async (req, res, next) => {
  const gethotel = req.params.hotelid;
  try {
    const hoteldata = await Hotel.findById(gethotel);
    try {
      const roomList = await Promise.all(
        hoteldata.room.map((roomId) => {
          return Room.findById(roomId);
        })
      );
      res.status(200).json(roomList);
    } catch (e) {
      next(
        errorMessage(
          500,
          "發生錯誤，找尋房間發生錯誤，可能為room資料庫有問題",
          e
        )
      );
    }
  } catch (e) {
    next(errorMessage(500, "查無此hotel id，無法查看rooms"));
  }
};
export const updatedRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updateRoom);
  } catch (e) {
    next(errorMessage(500, "查無資料", e));
  }
};
export const updatedRoomDates = async (req, res, next) => {
  const roomNumberId = req.params.id;
  const dates = req.body.dates;
  //到時候dates就會是我們傳入的datesList
 
  try {
    const updatedRoomDates = await Room.updateOne(
      { "roomNumbers._id": roomNumberId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": dates,
        },
      }
    );
    res.status(200).json(updatedRoomDates);
  } catch (error) {
    next(
      errorMessage(500, "預訂日期更新失敗，可能為格式錯誤或是找不到其ID", error)
    );
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { room: req.params.id },
      });
    } catch (e) {
      next(e);
    }
    res.status(200).json("成功刪除房間資訊");
  } catch (e) {
    next(errorMessage(500, "刪除失敗，找不到房間id", e));
  }
};
