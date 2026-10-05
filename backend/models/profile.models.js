import { Sequelize } from "sequelize";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { DataTypes } = Sequelize;

const ProfileModels = db.define(
  "profile_information",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      validate: {
        notEmpty: {
          msg: "Your are not logged in."
        }
      }
    },
    phone: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: true,
    },
    preference_food: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    alergi_food: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    skill: {
      type: DataTypes.ENUM("beginner", "medium", "intermediate", "expert"),
      defaultValue: "beginner",
    },
  },
  {
    freezeTableName: true,
  },
);

export default ProfileModels;
