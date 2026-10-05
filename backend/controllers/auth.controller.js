import {
  RefreshTokenModels,
  UsersModels,
  ProfileModels,
} from "../models/initialize.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { emailRegex, passwordRegex } from "../utils/regexp.utils.js";
import { Op } from "sequelize";
import { success, error } from "../utils/response.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.services.js";
import speakeasy from "speakeasy";
import dotenv from "dotenv";
import { generate2FAChallengeToken } from "./../utils/generate2FAChallengeToken.js";
import { verify2FAChallengeToken } from "./../utils/verify2FAChallengeToken.js";

dotenv.config();

const productionENV = process.env.APP_ENVIRONMENT === "production";

const verifyLogin2FA = async (req, res) => {
  try {
    const { token, challengeToken } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "OTP code is required",
      });
    }

    if (!challengeToken) {
      return res.status(401).json({
        message: "Login session is invalid",
      });
    }

    const decoded = await verify2FAChallengeToken(challengeToken);

    if (!decoded || decoded.type !== "2fa-login") {
      return res.status(401).json({
        message: "Invalid login session",
      });
    }

    const user = await UsersModels.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.two_factor_enabled !== "active") {
      return res.status(400).json({
        message: "Two-factor authentication is not enabled",
      });
    }

    const isValid = speakeasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid authentication code",
      });
    }

    const payload = {
      id: user.id,
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    await RefreshTokenModels.create({
      token: refreshToken,
      user_id: user.id,
    });

    await UsersModels.update(
      {
        is_active: "active",
      },
      {
        where: {
          id: user.id,
        },
      },
    );

    res.cookie("AccessToken", accessToken, {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Two-factor authentication successful",
    });
  } catch (errors) {
    error(res, 500, "Server error", errors.message);
  }
};

const login = async (req, res) => {
  try {
    const { UsersOrEmail, password } = req.body;

    if (!UsersOrEmail) {
      return res.status(400).json({
        message: "Email or username is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const user = await UsersModels.findOne({
      where: {
        [Op.or]: [{ email: UsersOrEmail }, { username: UsersOrEmail }],
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Your username or email address is incorrect!",
      });
    }

    if (user.is_active === "banned") {
      return res.status(403).json({
        message: "Your account has been banned",
      });
    }

    if (user.is_active === "deletes") {
      return res.status(403).json({
        message: "Your account has been deleted.",
      });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (user.two_factor_enabled === "active") {
      const challengeToken = await generate2FAChallengeToken({
        id: user.id,
        type: "2fa-login",
      });

      return res.status(200).json({
        message: "Two-factor authentication required",
        requires2FA: true,
        challengeToken,
      });
    }

    const payload = {
      id: user.id,
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    await RefreshTokenModels.create({
      token: refreshToken,
      user_id: user.id,
    });

    await UsersModels.update(
      {
        is_active: "active",
      },
      {
        where: {
          id: user.id,
        },
      },
    );

    res.cookie("AccessToken", accessToken, {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfully",
      requires2FA: false,
    });
  } catch (errors) {
    error(res, 500, "Server error", errors.message);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, confPassword, username } = req.body;
    const usersCount = await UsersModels.count();
    const role = usersCount === 0 ? "admin" : "users";

    // Validate input
    if (!email || !password || !confPassword || !username) {
      return res.status(400).json({
        message:
          "Email, password, confirm password, and username are required.",
      });
    }

    // Validate password match
    if (password !== confPassword) {
      return res
        .status(400)
        .json({ message: "Password and password confirmation do not match." });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "The password must be at least 8 characters long and include uppercase letters, numbers, and symbols.",
      });
    }

    // Validate username format
    if (username.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "The username must be at least 3 characters long." });
    }

    // Check if user exists
    const existingUser = await UsersModels.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password using argon2
    const hashedPassword = await argon2.hash(password);

    // Create new user
    await UsersModels.create({
      email,
      password: hashedPassword,
      username,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (errors) {
    error(res, 500, "Server error", errors.message);
  }
};

const me = async (req, res) => {
  try {
    const user = await UsersModels.findByPk(req.user.id, {
      attributes: {
        exclude: ["password", "two_factor_secret", "two_factor_temp_secret"],
      },
      include: [
        {
          model: ProfileModels,
          as: "profiles",
          required: false,
        },
      ],
    });

    if (!user) {
      return error(res, 404, "User not found");
    }

    return success(res, 200, "User profile retrieved successfully", user);
  } catch (errors) {
    error(res, 500, "Server error", errors.message);
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user.id;

    const existingUsers = await UsersModels.findByPk(user);
    if (!existingUsers) {
      return res.status(404).json({ message: "User not found" });
    }

    const refreshToken = req.cookies?.RefreshToken || null;
    if (refreshToken) {
      await RefreshTokenModels.destroy({
        where: { token: refreshToken },
      });
    }

    if (existingUsers.is_active === "banned") {
      await UsersModels.update(
        { is_active: "banned" },
        { where: { id: user } },
      );
    } else if (existingUsers.is_active === "deletes") {
      await UsersModels.update(
        { is_active: "deletes" },
        { where: { id: user } },
      );
    } else {
      await UsersModels.update(
        { is_active: "in_active" },
        { where: { id: user } },
      );
    }

    res.clearCookie("AccessToken", {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
    });
    res.clearCookie("RefreshToken", {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
    });
    return success(res, 200, "Logout successfully");
  } catch (errors) {
    error(res, 500, "Server error", errors.message);
  }
};

const refresh = async (req, res) => {
  try {
    const token = req?.cookies?.RefreshToken || null;
    if (!token) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.APP_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const storedToken = await RefreshTokenModels.findOne({
      where: {
        token,
      },
    });

    if (!storedToken) {
      res.clearCookie("AccessToken", {
        httpOnly: true,
        secure: productionENV,
        sameSite: productionENV ? "none" : "lax",
      });
      res.clearCookie("RefreshToken", {
        httpOnly: true,
        secure: productionENV,
        sameSite: productionENV ? "none" : "lax",
      });
      return res
        .status(403)
        .json({ message: "Refresh token revoked or reused" });
    }

    const user = await UsersModels.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_active === "banned" || user.is_active === "deletes") {
      await RefreshTokenModels.destroy({ where: { token } });
      return res.status(403).json({ message: "Account is not active" });
    }

    // Rotation: invalidate old refresh token, issue new pair
    await RefreshTokenModels.destroy({ where: { token } });

    const newAccessToken = await generateAccessToken({ id: user.id });
    const newRefreshToken = await generateRefreshToken({ id: user.id });

    await RefreshTokenModels.create({
      token: newRefreshToken,
      user_id: user.id,
    });

    res.cookie("AccessToken", newAccessToken, {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.cookie("RefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return success(res, 200, "Access token refreshed successfully");
  } catch (errors) {
    error(res, 500, "Server error", errors.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const userID = req.user.id;
    const { password, newPassword, confPassword } = req.body;

    const users = await UsersModels.findByPk(userID);
    const match = await argon2.verify(users?.password, password);

    if (!match) {
      return error(res, 400, "Your password is incorrect.");
    }

    if (newPassword !== confPassword) {
      return error(res, 400, "Passwords do not match");
    }

    const hash = await argon2.hash(newPassword);

    await UsersModels.update(
      {
        password: hash,
      },
      {
        where: {
          id: userID,
        },
      },
    );

    return success(res, 200, "Password Successfully Updated");
  } catch (err) {
    error(res, 500, err.message || "Server Sedang Bermasalah");
  }
};

export { register, login, logout, me, refresh, updatePassword, verifyLogin2FA };
