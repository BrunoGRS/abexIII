import { db } from "../database/database.js";
import modelUsuario from "../models/modelUsuario.js";
import { Sequelize, DataTypes, QueryTypes } from "sequelize";

async function validateUser(req, res) {
  try {
    let info = [];

    const user = {
      Id: req.body.Id,
      S_Nome_Usuario: req.body.S_Nome_Usuario,
      S_Email: req.body.S_Email,
    };

    info = await db.query(
      `SELECT Id, S_Nome_Usuario, S_Email FROM usuario WHERE Id = ?, S_Nome_Usuario = ? AND S_Email = ?`,
      {
        replacements: [user.Id, user.S_Nome_Usuario, user.S_Email],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log(info);

    if (info.length > 0) {
      res.status(200).send({ msg: true });
    } else {
      res.status(409).send({ msg: false });
    }
  } catch (error) {
    res.status(500).send({ msg: `Erro: ${error}` });
    console.log(error);
  }
}

async function criarUser(req, res) {
  try {
    const user = {
      Id: req.body.Id,
      S_Nome_Usuario: req.body.S_Nome_Usuario,
      S_Email: req.body.S_Email,
    };

    if (!modelUsuario.sync().isPendig) {
      await modelUsuario.sync();
    }

    const result = await modelUsuario.create(user);

    if (result) {
      res.status(201).send({ msg: "Usuário cadastrado com sucesso!" });
    }
  } catch (error) {
    res.status(500).send({ msg: `Erro: ${error}` });
    console.log(error);
  }
}

export default { validateUser, criarUser };
