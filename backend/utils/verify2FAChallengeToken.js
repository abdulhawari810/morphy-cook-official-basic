import jwt from "jsonwebtoken";

export const verify2FAChallengeToken = async (token) => {
  try {
    // Signing key challenge JWT, bukan two_factor_secret per-user.
    // Secret per-user hanya dipakai di speakeasy.totp.verify().
    return jwt.verify(token, process.env.APP_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};
