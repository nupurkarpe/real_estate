import mongoose from "mongoose";

const recentLoginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
});

const RecentLogin = mongoose.model("RecentLogin", recentLoginSchema);
export default RecentLogin;
