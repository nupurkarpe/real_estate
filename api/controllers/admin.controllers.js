import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import RecentLogin from "../models/RecentLogin.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true });
    res.status(200).json(admins);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching admins." });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await User.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    res.status(200).json({ message: "Admin deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the admin." });
  }
};

export const saveRecentLogin = async (userId, ipAddress) => {
  try {
    const login = new RecentLogin({
      userId,
      ipAddress,
      timestamp: new Date(),
    });
    await login.save();
  } catch (error) {
    console.error("Error saving recent login:", error);
  }
};

export const getRecentLogins = async (req, res) => {
  try {
    // Fetch recent logins (you can add pagination or filtering if needed)
    const recentLogins = await RecentLogin.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.status(200).json(recentLogins);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getListingsCount = async (req, res, next) => {
  try {
    const type = req.query.type;
    const offer = req.query.offer === "true";

    const countQuery = {};
    if (type) {
      countQuery.type = type;
    }
    if (offer !== undefined) {
      countQuery.offer = offer;
    }

    const count = await Listing.countDocuments(countQuery);
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};
