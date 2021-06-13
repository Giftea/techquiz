import express from "express";
import { protect, admin } from "../middleware/authMiddleWare.js";
const router = express.Router();
import {
  authUser,
  adminLogin,
  getUsers,
} from "../controllers/userController.js";

router.post("/login", adminLogin);
router.route("/").post(authUser).get(protect, getUsers);

export default router;

// router.route("/").post(registerUser).get(protect, admin, getUsers);
// router.post("/login", authUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);