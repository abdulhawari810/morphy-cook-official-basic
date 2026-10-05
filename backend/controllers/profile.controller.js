import { ProfileModels, UsersModels } from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await ProfileModels.findOne({
      where: {
        userId,
      },
    });
    if (!existingProfile) {
      return success(res, 200, "Information not found.");
    }

    success(
      res,
      200,
      "The information has been successfully found!",
      existingProfile,
    );
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

export const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      phone,
      bio = null,
      gender,
      date,
      skill = "beginner",
      preference_food,
      alergi_food,
    } = req.body;
    const numberFormat = parseInt(phone);

    const existingUsers = await UsersModels.findOne({
      where: {
        id: userId,
      },
    });

    const profile = await ProfileModels.findOne({
      where: {
        userId,
      },
    });

    if (!existingUsers) {
      return error(res, 404, "User not found!");
    }
    await ProfileModels.create({
      phone: numberFormat ?? profile?.phone ?? 0,
      bio: bio ?? profile?.bio ?? null,
      gender: gender ?? profile?.gender ?? null,
      userId,
      date: date ?? profile?.date ?? null,
      skill: skill || profile?.skill || "beginner",
      preference_food: preference_food ?? profile?.preference_food ?? null,
      alergi_food: alergi_food ?? profile?.alergi_food ?? null,
    });

    return success(res, 201, "The information has been successfully added!");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      phone,
      bio = null,
      gender,
      date,
      skill = "beginner",
      preference_food,
      alergi_food,
    } = req.body;
    const numberFormat = parseInt(phone);
    const existingUsers = await UsersModels.findOne({
      where: {
        id: userId,
      },
    });

    const profile = await ProfileModels.findOne({
      where: {
        userId,
      },
    });

    if (!existingUsers) {
      return error(res, 404, "User not found!");
    }

    await ProfileModels.update(
      {
        phone: numberFormat ?? profile?.phone ?? 0,
        bio: bio ?? profile?.bio ?? null,
        gender: gender ?? profile?.gender ?? null,
        date: date ?? profile?.date ?? null,
        skill: skill || profile?.skill || "beginner",
        preference_food: preference_food ?? profile?.preference_food ?? null,
        alergi_food: alergi_food ?? profile?.alergi_food ?? null,
      },
      {
        where: {
          userId,
        },
      },
    );

    return success(res, 200, "The information has been successfully updated!");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
