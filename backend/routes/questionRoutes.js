import express from "express";
import {
  getQuestionById,
  getQuestions,
} from "../controllers/questionController.js";

const router = express.Router();

router.route("/").get(getQuestions )
router.route("/:id").get(getQuestionById )



export default router;
