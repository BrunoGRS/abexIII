import { db } from "../database/database.js";
import modelProfissionais from "../models/modelProfissionais.js";
import { Sequelize, DataTypes, QueryTypes } from "sequelize";

async function criarProfissional(req, res) {
  try {
    const profissional = {
      S_Cod_Registro: req.body.S_Cod_Registro,
      S_Nome_Profissional: req.body.S_Nome_Profissional,
      S_Email: req.body.S_Email,
      S_Telefone: req.body.S_Telefone,
    };

    if (!modelProfissionais.sync().isPendig) {
      await modelProfissionais.sync();
    }

    const result = await modelProfissionais.create(profissional);

    if (result) {
      res.status(201).send({ msg: "Profissional pré cadastrado com sucesso!" });
    }
  } catch (error) {
    res
      .status(409)
      .send({ msg: `Erro ao cadastar profissional, error: ${error}` });
  }
}

async function buscarDadosCompletosProfissionais(req, res) {
  try {
    const informacoes = await db.query(
      `select P.S_Cod_Registro, 
          P.S_Nome_Profissional, 
          P.S_Email,
          E.S_Descricao_Especialidade
          from profissional P
          left join profissionalxespecialidade EP on P.Id = EP.I_Id_Profissional
          left join especialidade E on EP.Id = E.Id`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (informacoes) {
      return res.status(200).json({ data: informacoes });
    }
  } catch (error) {
    console.log(error);
  }
}

export default {
  criarProfissional,
  buscarDadosCompletosProfissionais,
};
