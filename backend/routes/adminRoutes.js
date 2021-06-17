import express from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = express.Router();
import {
  adminLogin,
  wipeUserData
} from "../controllers/adminController.js";

router.post("/login", adminLogin);
router.delete("/:wipe", wipeUserData);

export default router;