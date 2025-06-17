import express from "express";
import usuarioController from "../controllers/usuarioController.js";

export const UsuarioRouter = express.Router();

UsuarioRouter.route("/validar").post((req, res) =>
  usuarioController.validateUser(req, res)
);
UsuarioRouter.route("/criar").post((req, res) =>
  usuarioController.criarUser(req, res)
);
