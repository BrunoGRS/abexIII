import express from "express";
import { ProfissionalRouter } from "./routersProfissional.js";
import { BlogRouter } from "./routersBlog.js";
import { AgendamentoRouter } from "./routersAgendamento.js";
import { UsuarioRouter } from "./routersUsuario.js";

export const expressRouter = express.Router();

const routerProfissional = ProfissionalRouter;
const routerBlog = BlogRouter;
const routersAgendamento = AgendamentoRouter;
const routerUsuario = UsuarioRouter;

expressRouter.use("/profissional", routerProfissional);
expressRouter.use("/blog", routerBlog);
expressRouter.use("/agendamento", routersAgendamento);
expressRouter.use("/usuario", routerUsuario);
