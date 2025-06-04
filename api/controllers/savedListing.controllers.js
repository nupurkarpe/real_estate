// savedListing.controller.js
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const saveListing = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User not found!"));

    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));

    if (user.savedListings.includes(req.params.id)) {
      return res.status(400).json("Listing already saved!");
    }

    user.savedListings.push(req.params.id);
    await user.save();

    res.status(200).json("Listing saved successfully!");
  } catch (error) {
    next(error);
  }
};

export const getSavedListings = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("savedListings");
    if (!user) return next(errorHandler(404, "User not found!"));

    res.status(200).json(user.savedListings);
  } catch (error) {
    next(error);
  }
};

export const unsaveListing = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const listingId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.savedListings.includes(listingId)) {
      return res
        .status(400)
        .json({ message: "Listing not found in saved listings" });
    }

    user.savedListings = user.savedListings.filter(
      (id) => id.toString() !== listingId
    );
    await user.save();

    res.status(200).json({ message: "Listing unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
