import express from "express";
import usuarioController from "../controllers/usuarioController.js";

export const UsuarioRouter = express.Router();

ProfissionalRouter.route("/validar").get((req, res) =>
  usuarioController.validateUser(res, res)
);
