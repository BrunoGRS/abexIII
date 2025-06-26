import { Sequelize } from "sequelize";
import { db } from "../database/database.js";

export default db.define("post", {
  Id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  S_Titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  S_Conteudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  I_Id_Usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  DT_CreateAt: {
    timestamps: true,
    allowNull: true,
  },
});
