import {Router} from "express";

import { createExcelFile,editIndicePoblacion, studentSenrolled } from "../controllers/excel.controller.js";

const excelRoute = Router();

excelRoute.post("/crear", createExcelFile);
excelRoute.post("/editar", editIndicePoblacion);
excelRoute.post("/editar_matriculados", studentSenrolled)




export default excelRoute;