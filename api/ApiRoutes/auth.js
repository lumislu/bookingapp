import express from "express";
import { register,login } from "../RouterController/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
