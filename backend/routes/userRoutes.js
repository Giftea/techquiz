import express from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = express.Router();
import {
  authUser,
  getUsers,
} from "../controllers/userController.js";

router.route("/").post(authUser).get(getUsers)

export default router;

