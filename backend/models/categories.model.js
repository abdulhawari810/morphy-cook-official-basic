import { Sequelize } from "sequelize";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { DataTypes } = Sequelize;

const CategoriesModels = db.define(
  "categories",
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name Categories is required.",
        },
      },
    },
    desc: {
      type: DataTypes.STRING,
      defaultValue: "No Description.",
    },
  },
  {
    freezeTableName: true,
  },
);

export default CategoriesModels;
