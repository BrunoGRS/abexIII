import express from "express";
import profissionalController from "../controllers/profissionalController.js";

export const ProfissionalRouter = express.Router();

ProfissionalRouter.route("/create").post((req, res) =>
  profissionalController.criarProfissional(req, res)
);

ProfissionalRouter.route("/buscar").get((req, res) =>
  profissionalController.buscarDadosCompletosProfissionais(req, res)
);
