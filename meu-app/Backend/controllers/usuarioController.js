import { db } from "../database/database.js";
import modelUsuario from "../models/modelUsuario.js";
import { Sequelize, DataTypes, QueryTypes } from "sequelize";

async function validateUser(req, res) {
  try {
    const user = {
      S_Nome_Usuario: body.S_Nome_Usuario,
      S_Senha_Usuario: body.S_Senha_Usuario,
    };

    const info = await db.query(
      `select S_Nome_Usuario, S_Senha_Usuario from usuario where S_Nome_Usuario = ${user.S_Nome_Usuario} and S_Senha_Usuario = ${user.S_Senha_Usuario}
        `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (info) {
      res.status(200).send({ msg: true });
    } else {
      res.status(404).send({ msg: false });
    }
  } catch (error) {
    res.status(500).send({ msg: `Erro: ${error}` });
    console.log(error);
  }
}

export default validateUser;
