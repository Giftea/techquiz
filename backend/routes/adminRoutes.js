import express from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = express.Router();
import {
  adminLogin
} from "../controllers/adminController.js";

router.post("/login", adminLogin);

export default router;