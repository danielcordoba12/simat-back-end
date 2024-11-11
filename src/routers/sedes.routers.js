import { Router } from "express";

import { listarInfoSedes, listarSedes } from "../controllers/sedes.controller.js";

const sedesRoute = Router();

sedesRoute.get("/listar/:institucion",listarSedes);
sedesRoute.get("/sedes/:sedes",listarInfoSedes)

export default sedesRoute;