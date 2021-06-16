import express from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = express.Router();
import {
  authUser,
  getUsers,
  getUsersDoneWithQuiz,
  setQuizMetaData
} from "../controllers/userController.js";

router.route("/").post(authUser).get(getUsers)
router.route("/done").get(getUsersDoneWithQuiz);
router.route("/done/:id").get(getUsersDoneWithQuiz);
router.route("/meta").patch(setQuizMetaData);

export default router;

