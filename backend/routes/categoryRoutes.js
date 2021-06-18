import express from "express";
import { 
    getCategories ,
    addCategory,
    deleteCategories,
    deleteOneCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getCategories).post(addCategory).delete(deleteCategories)
router.route("/:id").delete(deleteOneCategory);

export default router;
