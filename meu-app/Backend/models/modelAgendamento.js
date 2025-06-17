import { Sequelize } from "sequelize";
import { db } from "../database/database.js";

export default db.define(
  "agendamento",
  {
    Id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    I_Id_Usuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    I_Id_Profissional: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    D_Data_Agenda: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    T_Hora_Agenda: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    E_Status: {
      type: Sequelize.ENUM("Pendente", "Confirmado", "Cancelado", "Disponivel"),
      allowNull: false,
      defaultValue: "Confirmado",
    },
  },
  {
    timestamps: false,
  }
);
