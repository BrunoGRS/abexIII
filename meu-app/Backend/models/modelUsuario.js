import { Sequelize } from "sequelize";
import { db } from "../database/database.js";

export default db.define(
  "usuario",
  {
    Id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    S_Nome_Usuario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    S_Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
