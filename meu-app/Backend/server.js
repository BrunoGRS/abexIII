import express from "express";
import cors from "cors";
import { main } from "./database/database.js";
import { expressRouter } from "./routers/router.js";

const app = express();

app.use(cors());
app.use(express.json());

const connectionDb = main();

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

const routerProfissional = expressRouter;

app.use("/api", routerProfissional);

app.listen(3000, () => {
  console.log("Servidor rodando em <http://localhost:3000>");
});
