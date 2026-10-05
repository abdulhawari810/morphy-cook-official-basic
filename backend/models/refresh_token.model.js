import { Sequelize } from "sequelize";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { DataTypes } = Sequelize;

const RefreshTokenModels = db.define(
  "refresh_tokens",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Refresh token tidak boleh kosong!",
        },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User ID tidak boleh kosong!",
        },
      },
    },
  },
  {
    freezeTableName: true,
  },
);

export default RefreshTokenModels;
