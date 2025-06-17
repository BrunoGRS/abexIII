import express from "express";
import agendamentoController from "../controllers/agendamentoController.js";

export const AgendamentoRouter = express.Router();

AgendamentoRouter.route("/agendar").post((req, res) =>
  agendamentoController.AgendarConsulta(req, res)
);
AgendamentoRouter.route("/buscar/:id").get((req, res) =>
  agendamentoController.mostrarConsultas(req.params.id, req, res)
);
AgendamentoRouter.route("/excluir/:id").delete((req, res) =>
  agendamentoController.excluirAgendamento(req.params.id, req, res)
);
