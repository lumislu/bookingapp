import mongoose, { Schema } from "mongoose";
const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: [{ type: Date }],
      },
    ],
  },
  { timestamps: true } ///記錄創建時間戳章
);
export default mongoose.model("Room", RoomSchema);
