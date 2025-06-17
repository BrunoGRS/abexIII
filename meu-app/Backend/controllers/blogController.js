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

export default { buscarPost };
