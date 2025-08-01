import { db } from "../database/database.js";
import { Sequelize } from "sequelize";
import modelAgendamento from "../models/modelAgendamento.js";
import { enviarEmail } from "../emailService.js";

async function AgendarConsulta(req, res) {
  try {
    let informacoes = [];
    const dataString = req.body.D_Data_Agenda;

    const partes = dataString.split("/");

    if (partes.length !== 3) {
      return res
        .status(400)
        .send({ msg: "Formato de data inválido. Use DD/MM/YYYY." });
    }

    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}T00:00:00`;

    const dataRecebida = new Date(dataFormatada);

    const agendamento = {
      I_Id_Usuario: req.body.I_Id_Usuario,
      I_Id_Profissional: req.body.I_Id_Profissional,
      D_Data_Agenda: dataRecebida,
      T_Hora_Agenda: req.body.T_Hora_Agenda,
      E_Status: req.body.E_Status,
    };

    informacoes = await db.query(
      `select 
              * 
      from agendamento where D_Data_Agenda = ? and T_Hora_Agenda = ?`,
      {
        replacements: [agendamento.D_Data_Agenda, agendamento.T_Hora_Agenda],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (informacoes.length > 0) {
      res
        .status(409)
        .send({ msg: `Já existe um agendamento nesse dia e horário.` });
    } else {
      !modelAgendamento.sync().isPendig ? modelAgendamento.sync() : "";

      const result = await modelAgendamento.create(agendamento);

      result
        ? res.status(201).send({ msg: "Agendado com sucesso!" })
        : res.status(404).send({ msg: "Não foi possível agendar" });

      if (result) {
        const usuario = await db.query(
          `SELECT S_Email FROM usuario WHERE Id = ?`,
          {
            replacements: [agendamento.I_Id_Usuario],
            type: Sequelize.QueryTypes.SELECT,
          }
        );

        if (usuario.length > 0) {
          const emailDestino = usuario[0].S_Email;
          const assunto = "Confirmação de Agendamento";
          const mensagem = `Seu agendamento foi realizado com sucesso!`;

          await enviarEmail(emailDestino, assunto, mensagem);
        }
      }
    }
  } catch (error) {}
}

async function mostrarConsultas(id, req, res) {
  try {
    const informacoes = await db.query(
      `select A.Id,
              P.S_Nome_Profissional,
              P.S_Telefone,
              P.S_Email,
              A.D_Data_Agenda,
              A.T_Hora_Agenda,
              A.E_Status
        from agendamento A
        inner join usuario U on U.Id = A.I_Id_Usuario
        inner join profissional P on P.Id = A.I_Id_Profissional
        where A.I_Id_Usuario = ?`,
      {
        replacements: [id],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (informacoes) {
      return res.status(201).json({ data: informacoes });
    } else {
      return res.status(404).json({ data: "Dados não encontrados." });
    }
  } catch (error) {
    res
      .status(409)
      .send({ msg: `Erro ao buscar agendamentos, error: ${error}` });
  }
}

async function excluirAgendamento(id, req, res) {
  try {
    const agendaExlucusao = await db.query(
      `delete from agendamento where Id = ?`,
      {
        replacements: [id],
      }
    );

    res.status(200).json({ msg: "Agenda excluída com sucesso." });
  } catch (error) {
    res.status(409).send({ msg: `Erro ao excluir, error: ${error}` });
  }
}

export default { AgendarConsulta, mostrarConsultas, excluirAgendamento };
