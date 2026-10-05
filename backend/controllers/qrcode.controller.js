import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { UsersModels } from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";

export const setup2FA = async (req, res) => {
  try {
    const userID = req.user.id;

    const { active } = req.body;

    if (!active) {
      return;
    }

    const users = await UsersModels.findByPk(userID, {
      attributes: {
        exclude: ["password"],
      },
    });

    const secret = speakeasy.generateSecret({
      name: `MCO (${users?.email})`,
      issuer: "Morphy Cook Official",
    });

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    await users.update({
      two_factor_temp_secret: secret.base32,
    });

    return success(res, 200, "QR code successfully created!", {
      success: true,
      qrcode: qrCodeUrl,
      secret: secret.base32,
    });
  } catch (err) {
    error(res, 500, err.message || "The server is experiencing issues.");
  }
};

export const verify2FA = async (req, res) => {
  try {
    const userID = req.user.id;
    const { token } = req.body;

    const users = await UsersModels.findByPk(userID, {
      attributes: {
        exclude: ["password"],
      },
    });

    const verified = speakeasy.totp.verify({
      secret: users?.two_factor_temp_secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return error(res, 400, "Invalid verification code");
    }

    await users.update(
      {
        two_factor_secret: users?.two_factor_temp_secret,
        two_factor_temp_secret: null,
        two_factor_enabled: "active",
        two_factor_updateAt: new Date(),
      },
      {
        where: {
          id: users?.id,
        },
      },
    );

    return success(res, 200, "2-step verification successfully enabled!");
  } catch (err) {
    error(res, 500, err.message || "The server is experiencing issues.");
  }
};

export const disableVerify2FA = async (req, res) => {
  try {
    const userID = req.user.id;
    const { token } = req.body;

    const users = await UsersModels.findByPk(userID);

    if (!users) {
      return error(res, 404, "You are not logged in!");
    }

    if (!users.two_factor_enabled || !users.two_factor_secret) {
      return error(res, 400, "2-step verification is disabled!");
    }

    const isValid = speakeasy.totp.verify({
      secret: users.two_factor_secret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid) {
      return error(res, 400, "Invalid OTP code!");
    }

    await users.update({
      two_factor_enabled: "nonactive",
      two_factor_secret: null,
      two_factor_temp_secret: null,
      two_factor_updateAt: new Date(),
    });

    return success(res, 200, "2-step verification successfully disabled!", {
      two_factor_updateAt: users.two_factor_updateAt,
    });
  } catch (err) {
    error(res, 500, err.message || "The server is experiencing issues!");
  }
};
