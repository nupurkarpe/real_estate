import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { saveRecentLogin } from "../controllers/admin.controllers.js";

const adminEmails = ["admin1@gmail.com", "admin2@gmail.com"];

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const isAdmin = adminEmails.includes(email);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const vaildUser = await User.findOne({ email });
    if (!vaildUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, vaildUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
    const token = jwt.sign(
      { id: vaildUser._id, isAdmin: vaildUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = vaildUser._doc;
    const ipAddress = req.ip; // Get the IP address of the user
    await saveRecentLogin(vaildUser._id, ipAddress);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

    // if (vaildUser.isAdmin) {
    //   return res.redirect("/admin/dashboard");
    // }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      const ipAddress = req.ip; // Get the IP address of the user
      await saveRecentLogin(user._id, ipAddress);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random.toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      const ipAddress = req.ip; // Get the IP address of the user
      await saveRecentLogin(user._id, ipAddress);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
