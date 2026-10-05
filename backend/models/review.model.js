import { Sequelize } from "sequelize";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { DataTypes } = Sequelize;

const ReviewModels = db.define(
  "reviews",
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
          msg: "You are not logged in.",
        },
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recipes",
        key: "id",
      },
      validate: {
        notEmpty: {
          msg: "Recipes is not found.",
        },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "Rating must be between 1 and 5.",
        },
        max: {
          args: [5],
          msg: "Rating must be between 1 and 5.",
        },
        isInt: {
          msg: "Rating must be an integer.",
        },
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "recipeId"],
      },
    ],
  },
);

export default ReviewModels;
