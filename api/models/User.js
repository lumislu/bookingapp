import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, //不能重複
    },
    email: {
      type: String,
      required: true,
      unique: true, //不能重複
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); //記錄創建時間戳章，通常後台需要再看到user的創建時間
export default mongoose.model("User", UserSchema);
