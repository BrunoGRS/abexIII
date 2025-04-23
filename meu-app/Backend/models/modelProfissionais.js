import { Sequelize } from "sequelize";
import { db } from "../database/database.js";

export default db.define(
  "preprofissional",
  {
    Id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    S_Cod_Registro: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    S_Nome_Profissional: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    S_Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    S_Telefone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
