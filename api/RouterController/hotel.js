import { Router } from "express";
import { errorMessage } from "../errorMessage.js";
import Hotel from "../models/Hotel.js";

//創建飯店資訊
export const createHotel = async (req, res, next) => {
  //新增next
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(errorMessage(500, "資料上傳錯誤請確認格式")); //後來我們想要客製化的
  }
};
//獲取全部飯店資訊
//getAllHotels升級版，讓他能抓取全部資料也能依照query值去找想要的資料
export const getAllHotel = async (req, res, next) => {
  const { lowestPrice, highestPrice, ...withQuery } = req.query;
  //如果url上有寫popularHotels＝true,popularHotels會回傳true 沒有寫就沒這條件
  try {
    const hotelsList = await Hotel.find({
      ...withQuery,
      cheapestPrice: { $gt: lowestPrice || 0, $lt: highestPrice || 9999 }, //...代表說只要找到有相關欄位且符合的
    }).limit(7); //讓他回傳資料最多就七個
    res.status(200).json(hotelsList);
  } catch (error) {
    next(errorMessage(500, "無法抓取所有飯店資料", error));
  }
};
//獲取指定id飯店資訊
export const getHotel = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const getHotel = await Hotel.findById(id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(errorMessage(500, "找不到資料，請檢查是否有此id", error));
  }
};
//更新指定id的飯店資訊
export const updateHotel = async (req, res, nexr) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (e) {
    next(errorMessage(500, "修改失敗，請確認id與欄位輸入是否正確", error));
  }
};
//刪除id飯店資訊
export const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("刪除資料成功");
  } catch (error) {
    next(errorMessage(500, "刪除失敗，請確認是否有此id", error));
  }
};

//來統計各個type的種數
export const amountOfType = async (req, res, next) => {
  const type = req.query.type.split(",");
  try {
    const list = await Promise.all(
      type.map((type) => {
        return Hotel.countDocuments({ type: type });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(errorMessage(500, "無法抓取住宿種類", error));
  }
};

//來統計各個cities的種數
export const amountOfCities = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(errorMessage(500, "無法統計各個城市的提供住宿的數量", error));
  }
};
