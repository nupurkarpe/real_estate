// savedListing.route.js
import express from "express";
import {
  saveListing,
  getSavedListings,
  unsaveListing,
} from "../controllers/savedListing.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/save/:id", verifyToken, saveListing);
router.get("/saved", verifyToken, getSavedListings);
router.post("/unsave/:id", verifyToken, unsaveListing);

export default router;
