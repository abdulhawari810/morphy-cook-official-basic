import { Sequelize } from "sequelize";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { DataTypes } = Sequelize;

const RecipeModels = db.define(
  "recipes",
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name field is required.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description field is required.",
        },
      },
    },
    ingredients: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Ingredients field is required.",
        },
      },
    },
    instructions: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Instructions field is required.",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "placeholder.png",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      validate: {
        notEmpty: {
          msg: "logged in is required.",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "logged in is required.",
        },
      },
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "pending", "reject", "accept"),
      defaultValue: "pending",
      allowNull: false,
      validate: {
        isIn: [["draft", "pending", "reject", "accept"]],
      },
    },
  },
  {
    freezeTableName: true,
  },
);

export default RecipeModels;
