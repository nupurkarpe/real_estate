import express from "express";
import {
  deleteUser,
  getUser,
  getUserListing,
  test,
  UpdateUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/test", test);
router.post("/update/:id", verifyToken, UpdateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/:id", verifyToken, getUser);

export default router;
