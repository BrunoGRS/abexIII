import express from "express";
import { ProfissionalRouter } from "./routersProfissional.js";

export const expressRouter = express.Router();

const routerProfissional = ProfissionalRouter;

expressRouter.use("/profissional", routerProfissional);
