import express from "express";
import cors from 'cors'


import instiucionesRoute from "./src/routers/instituciones.router.js";
import sedesRoute from "./src/routers/sedes.routers.js";
import excelRoute from "./src/routers/excel.router.js";
import generosTotalRoute from "./src/routers/indicePoblacional.router.js";
import bodyParser from "body-parser";
import file from './src/routers/porcesarArchivo.router.js';


const app = express ();

app.use(express.json());
// app.use(bodyParser.json())

app.use(cors());

app.use("/instituciones",instiucionesRoute);
app.use("/sedes",sedesRoute);
app.use("/excel",excelRoute);
app.use("/indice_poblacional", generosTotalRoute)
app.use("/archivo", file);


app.listen(4000,() => {
    console.log("El servidor se esta ejecutando en el puerto 4000");
});


