import { db } from "../database/database.js";
import { Sequelize } from "sequelize";

async function buscarPost(req, res) {
  try {
    const informacoes = await db.query(
      `select P.Id, S_Titulo,
                P.S_Conteudo 
        from post P`,
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

async function mostrarPost(id, req, res) {
  try {
    const informacoes = await db.query(
      `select   P.S_Titulo,
                P.S_Conteudo,
                P.D_CreateAt,
                U.S_Nome_Usuario
        from post P
        inner join usuario U on U.Id = P.S_Id_Usuario
        where P.Id = ?`,
      {
        replacements: [id],
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

export default { buscarPost, mostrarPost };
