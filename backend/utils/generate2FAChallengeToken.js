import jwt from "jsonwebtoken";

// NOTE: Ini BUKAN two_factor_secret per-user di database.
// Ini hanya signing key untuk challenge JWT sementara (pre-auth),
// sedangkan OTP diverifikasi pakai users.two_factor_secret via speakeasy.
export const generate2FAChallengeToken = async ({ id, type }) => {
  return jwt.sign(
    {
      id,
      type,
    },
    process.env.APP_ACCESS_SECRET,
    {
      expiresIn: "10m",
    },
  );
};
