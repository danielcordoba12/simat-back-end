import { pool } from "../database/conexion.js";


export const listarInstituciones = async (req,res) => {
    try {
        const[result] = await pool.query ('SELECT institucion FROM nombre_de_tabla group by institucion')
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({
            massage : "Error en listar las instituciones" + err
        })
    }
}


