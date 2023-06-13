import express from "express";
import { verifyAdmin, verifyUser } from "../JWT_Token.js";
import {
  updateUser,
  deletedUser,
  getUser,
  getAllUsers,
} from "../RouterController/user.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deletedUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getAllUsers);

export default router;
