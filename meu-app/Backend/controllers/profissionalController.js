import { db } from "../database/database.js";
import modelProfissionais from "../models/modelProfissionais.js";

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

    if (modelProfissionais.create(profissional)) {
      res.status(201).send({ msg: "Profissional Cadastrado com sucesso!" });
    }
  } catch (error) {
    console.log(req.body);
    res
      .status(400)
      .send({ msg: `Erro ao cadastar profissional, error: ${error}` });
  }
}

async function buscarProfissional(req, res) {
  try {
    let profissional = modelProfissionais.findAll();

    if (profissional) {
      profissional.then(
        (dados) => {
          res.status(200).send({ msg: dados });
        },
        (error) => {
          onsole.error("Erro ao mostrar Profissionais", error);
        }
      );
    }
  } catch (error) {}
}

export default { criarProfissional, buscarProfissional };
