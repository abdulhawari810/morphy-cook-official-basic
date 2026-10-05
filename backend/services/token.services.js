import jwt from "jsonwebtoken";

export const generateAccessToken = async (payload) => {
  return jwt.sign(payload, process.env.APP_ACCESS_SECRET, { expiresIn: "1d" });
};

export const generateRefreshToken = async (payload) => {
  return jwt.sign(payload, process.env.APP_REFRESH_SECRET, { expiresIn: "7d" });
};
