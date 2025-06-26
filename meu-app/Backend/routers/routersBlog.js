import express from "express";
import blogController from "../controllers/blogController.js";

export const BlogRouter = express.Router();

BlogRouter.route("/buscar").get((req, res) =>
  blogController.buscarPost(req, res)
);

BlogRouter.route("/ler/:id").get((req, res) =>
  blogController.mostrarPost(req.params.id, req, res)
);
