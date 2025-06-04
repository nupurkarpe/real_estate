// admin.route.js
import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllListings,
  deleteListing,
  getAllAdmins,
  deleteAdmin,
  getRecentLogins,
  getListingsCount,
} from "../controllers/admin.controllers.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import { getRecentActivities } from "../controllers/activity.controllers.js";

const router = express.Router();

// Admin Management Routes (protected)
router.get("/users", verifyAdmin, getAllUsers);
router.delete("/user/:id", verifyAdmin, deleteUser);
router.get("/listings", verifyAdmin, getAllListings);
router.delete("/listing/:id", verifyAdmin, deleteListing);
router.get("/admins", verifyAdmin, getAllAdmins);
router.delete("/admin/:id", verifyAdmin, deleteAdmin);
router.get("/recent-logins", verifyAdmin, getRecentLogins);
router.get("/count", getListingsCount);
router.get("/recent-activities", getRecentActivities);
export default router;
