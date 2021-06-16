import express from "express";
import {
  getQuestionById,
  getQuestions,
  uploadQuestions,
  upsertQuestions
} from "../controllers/questionController.js";

const router = express.Router();

router.route("/").get(getQuestions)
router.route("/:id").get(getQuestionById)
router.route("/uploads").post(uploadQuestions);
router.route("/uploads/data").post(upsertQuestions);



export default router;
