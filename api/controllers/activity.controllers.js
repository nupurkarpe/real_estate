import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const getRecentActivities = async (req, res, next) => {
  try {
    const newListings = await Listing.find().sort({ createdAt: -1 }).limit(5);
    const newUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    // Combine into one array
    const activities = [
      ...newListings.map((item) => ({ type: "listing", ...item.toObject() })),
      ...newUsers.map((item) => ({ type: "user", ...item.toObject() })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};
