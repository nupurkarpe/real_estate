import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Adjust the import as necessary

// Middleware to check admin access
export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token; // Assuming token is in cookies
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Check if user is admin
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin)
      return res.status(403).json({ message: "Admin access required" });

    req.user = user; // Attach user to request object
    next();
  });
};
