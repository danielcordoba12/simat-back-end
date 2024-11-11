import { Router } from "express";

import { listarInstituciones } from "../controllers/instituciones.controller.js";

const instiucionesRoute = Router();

instiucionesRoute.get("/listar",listarInstituciones);


export default instiucionesRoute;

