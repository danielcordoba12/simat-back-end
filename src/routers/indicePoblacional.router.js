import { Router } from "express";

import { listGenerosTotal, listEstudiantesFormacion, listStudentSenrolled } from "../controllers/indicePoblacional.controller.js";

const generosTotalRoute = Router();

generosTotalRoute.get("/listar",listGenerosTotal);
generosTotalRoute.get("/listar_estudiantes_formacion",listEstudiantesFormacion);
generosTotalRoute.get("/listar_matriculados", listStudentSenrolled);


export default generosTotalRoute;