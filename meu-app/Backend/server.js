import express from "express";
import cors from "cors";
import { main } from "./database/database.js";
import { expressRouter } from "./routers/router.js";

const app = express();

app.use(cors());
app.use(express.json());

const connectionDb = main();

const routerProfissional = expressRouter;

app.use("/api", routerProfissional);

app.listen(3000, () => {
  console.log("Servidor rodando em <http://localhost:3000>");
});
