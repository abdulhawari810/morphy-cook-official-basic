import { Op } from "sequelize";
import {
  RecipeModels,
  UsersModels,
  ProfileModels,
} from "../models/initialize.model.js";
import { success, error } from "../utils/response.utils.js";
import {
  usernameRegex,
  emailRegex,
  passwordRegex,
} from "../utils/regexp.utils.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const { search, sort, filter } = req.query;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (filter) {
      const filters = JSON.parse(filter);
      if (filters.role) {
        whereClause.role = filters.role;
      } else if (filters.is_active) {
        whereClause.is_active = filters.is_active;
      } else if (filters.is_verified) {
        whereClause.is_verified = filters.is_verified;
      }
    }

    const orderClause = [];
    if (sort) {
      if (sort === "asc") {
        orderClause.push(["username", "ASC"]);
      } else if (sort === "desc") {
        orderClause.push(["username", "DESC"]);
      }
    }

    const users = await UsersModels.findAll({
      where: whereClause,
      order: orderClause,
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: RecipeModels,
          as: "recipes",
          attributes: ["id"],
        },
      ],
    });

    if (search && users.length === 0) {
      return success(
        res,
        200,
        `No users found matching the keyword. "${search}" or the applied filters`,
      );
    }

    if (users?.length === 0) {
      return success(res, 200, "The user data is still empty.");
    }

    return success(res, 200, "Data users successfully found.", users);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UsersModels.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!users) {
      return error(res, 404, "User not found!");
    }

    return success(res, 200, "Users successfully found", users);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const createUsers = async (req, res) => {
  try {
    const {
      username,
      email,
      confPassword,
      password,
      is_active,
      is_verified,
      gender,
      profile,
    } = req.body;

    const existing = await UsersModels.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    const checkRole = await UsersModels.findAndCountAll();

    const roles = checkRole.count === 0 ? "admin" : "user";

    if (existing) {
      return error(
        res,
        400,
        "The username or email address has already been used.",
      );
    }

    if (!usernameRegex.test(username)) {
      return error(
        res,
        400,
        "Username must be at least 5 characters long and include both uppercase and lowercase letters.",
      );
    }

    if (!emailRegex.test(email)) {
      return error(res, 400, "Invalid email");
    }

    if (!passwordRegex.test(password)) {
      return error(
        res,
        400,
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.",
      );
    }

    if (password !== confPassword) {
      return error(
        res,
        400,
        "Password and password confirmation do not match.",
      );
    }

    const hashedPassword = await argon2.hash(password);

    const newUsers = await UsersModels.create({
      username,
      email,
      password: hashedPassword,
      role: roles,
      is_active: is_active || true,
      is_verified: is_verified || false,
      gender,
      profile,
    });

    return success(res, 201, "Users successfully created", {
      id: newUsers.id,
      username: newUsers.username,
      email: newUsers.email,
      role: newUsers.role,
      is_active: newUsers.is_active,
      is_verified: newUsers.is_verified,
      gender: newUsers.gender,
      profile: newUsers.profile,
    });
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, gender, profile, is_active, is_verified, role } =
      req.body;

    const users = await UsersModels.findOne({
      where: { id },
    });

    if (!users) {
      return error(res, 404, "User not found!");
    }

    const existing = await UsersModels.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
        id: { [Op.ne]: id },
      },
    });

    if (existing) {
      return error(
        res,
        400,
        "The username or email address has already been used.",
      );
    }

    if (username && !usernameRegex.test(username)) {
      return error(
        res,
        400,
        "Username must be at least 5 characters long and include both uppercase and lowercase letters.",
      );
    }

    if (email && !emailRegex.test(email)) {
      return error(res, 400, "Invalid email");
    }

    await UsersModels.update(
      {
        username: username || users.username,
        email: email || users.email,
        gender,
        profile,
        is_active: is_active !== undefined ? is_active : users.is_active,
        is_verified:
          is_verified !== undefined ? is_verified : users.is_verified,
        role: role !== undefined ? role : users.role,
      },
      { where: { id } },
    );

    const updatedUsers = await UsersModels.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });

    return success(res, 200, "Users successfully updated.", updatedUsers);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const updateStatusUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const { is_active } = req.body;

    const users = await UsersModels.findOne({
      where: { id: userId },
    });

    if (!users) {
      return error(res, 200, "User not found!");
    }

    if (users.role === "admin") {
      return error(res, 400, "Unable to change admin status");
    }
    await UsersModels.update(
      {
        is_active: is_active !== undefined ? is_active : users.is_active,
      },
      { where: { id: userId } },
    );
    return success(res, 200, "User status successfully updated.");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const createAllUsers = async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return error(
        res,
        400,
        "The users data must be an array and cannot be empty.",
      );
    }

    const createdUsers = [];

    for (const user of users) {
      const {
        username,
        email,
        password,
        confPassword,
        gender,
        profile,
        is_active,
        is_verified,
      } = user;

      const existing = await UsersModels.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existing) {
        return error(res, 400, `Username or Email ${username} has been used`);
      }

      if (!usernameRegex.test(username)) {
        return error(res, 400, `Username ${username} invalid`);
      }

      if (!emailRegex.test(email)) {
        return error(res, 400, `Email ${email} invalid`);
      }

      if (!passwordRegex.test(password)) {
        return error(
          res,
          400,
          `The password does not meet the criteria for the user. ${username}`,
        );
      }

      if (password !== confPassword) {
        return error(
          res,
          400,
          `Password does not match for the user. ${username}`,
        );
      }

      const hashedPassword = await argon2.hash(password);

      const checkRole = await UsersModels.findAndCountAll();
      const roles = checkRole.count === 0 ? "admin" : "users";

      const newUser = await UsersModels.create({
        username,
        email,
        password: hashedPassword,
        role: roles,
        is_active: is_active !== undefined ? is_active : "active",
        is_verified: is_verified !== undefined ? is_verified : "in_verified",
        gender,
        profile,
      });

      createdUsers.push({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    }

    return success(res, 201, "All users were successfully created.", createdUsers);
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const deleteUsers = async (req, res) => {
  try {
    const user = req.user.id;

    const adminUsers = await UsersModels.findOne({
      where: {
        role: "admin",
        id: user,
      },
    });

    if (adminUsers && adminUsers.id !== user) {
      return error(res, 400, "You cannot delete users.");
    }

    const users = await UsersModels.findOne({
      where: { id: user },
    });

    if (!users) {
      return error(res, 404, "User not found!");
    }

    await UsersModels.update(
      {
        is_active: "deletes",
      },
      {
        where: { id: user },
      },
    );

    return success(res, 200, "Account successfully deleted");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
export const updateProfileUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      username,
      email,
      phone,
      gender,
      preference_food,
      alergi_food,
      profile,
      bio,
      skill,
      date,
    } = req.body;

    const existingUsers = await UsersModels.findOne({
      where: {
        id: userId,
      },
    });

    const existSkill = existingUsers?.role === "chief" ? skill : "not_verify";

    const existingProfile = await ProfileModels.findOne({
      where: {
        userId,
      },
    });

    if (!existingUsers) return error(res, 404, "User data not found");

    const update = await UsersModels.update(
      {
        username,
        email,
        profile,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    if (!existingProfile) {
      await ProfileModels.create({
        userId,
        gender,
        phone: parseInt(phone),
        bio,
        date,
        preference_food,
        alergi_food,
        existSkill,
      });
    } else {
      await ProfileModels.update(
        {
          userId: update.id,
          gender,
          phone: parseInt(phone),
          date,
          bio,
          preference_food,
          alergi_food,
          existSkill,
        },
        {
          where: {
            userId,
          },
        },
      );
    }

    return success(res, 201, "Profile successfully updated.");
  } catch (errors) {
    error(res, 500, errors.message);
  }
};
