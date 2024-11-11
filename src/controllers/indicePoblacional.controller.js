import { pool } from "../database/conexion.js";

export const listGenerosTotal = async (req, res) => {
    try{
        // let generosTotal = 

        const [result] = await pool.query (`SELECT 
            INSTITUCION,
            COUNT(CASE WHEN genero = 'MASCULINO' AND estado = 'MATRICULADO' THEN 1 END) AS masculino,
            COUNT(CASE WHEN genero = 'FEMENINO' AND estado = 'MATRICULADO' THEN 1 END) AS femenino,
            COUNT(CASE WHEN discapacidad != 'NO APLICA' THEN 1 END) AS total_con_discapacidad -- Cuenta solo los que tienen discapacidad
                FROM 
                    simat.nombre_de_tabla 
                WHERE 
                    GRADO_COD BETWEEN 0 AND 11 
                GROUP BY 
                    INSTITUCION 
                ORDER BY 
                    INSTITUCION DESC;
                `)
                res.status(200).json(result);
                }catch(err) {
        res.status(500).json({
            message : "Error al momento de listar el total de los genero por institucion",err
        })
    }
}


export const listEstudiantesFormacion = async (req, res) => {
    try{
        // let generosTotal = 

        const [result] = await pool.query (`SELECT INSTITUCION,
	COUNT(CASE WHEN GRADO_COD = 0 THEN 1 END) AS PRESCOLAR,
    COUNT(CASE WHEN GRADO_COD  BETWEEN 1 AND 5 THEN 1 END) AS PRIMARIA,
	COUNT(CASE WHEN GRADO_COD BETWEEN 6 AND 9 THEN 1 END) AS SECUNDARIA,
    COUNT(CASE WHEN GRADO_COD BETWEEN 10 AND 11 THEN 1 END) AS MEDIA
    
        FROM
            simat.nombre_de_tabla
        WHERE
            ESTADO = 'MATRICULADO'
            GROUP BY INSTITUCION
            ORDER BY INSTITUCION DESC;`)
                        res.status(200).json(result);
                }catch(err) {
        res.status(500).json({
            message : "Error al momento de listar el total de los genero por institucion" ,err
        })
    }
}


export const listStudentSenrolled = async (req ,res) => {

    try{
        const [result] = await pool.query ( `
            SELECT INSTITUCION,
                COUNT(CASE WHEN GRADO_COD = 00 THEN 1 END) AS PRESCOLAR,
                COUNT(CASE WHEN GRADO_COD  = 01 THEN 1 END) AS PRIMERO,
                COUNT(CASE WHEN GRADO_COD = 02 THEN 1 END) AS SEGUNDO,
                COUNT(CASE WHEN GRADO_COD = 03 THEN 1 END) AS TERCERO,
                COUNT(CASE WHEN GRADO_COD = 04 THEN 1 END) AS CUARTO,
                COUNT(CASE WHEN GRADO_COD = 05 THEN 1 END) AS QUINTO,
                COUNT(CASE WHEN GRADO_COD = 06 THEN 1 END) AS SEXTO,
                COUNT(CASE WHEN GRADO_COD = 07 THEN 1 END) AS SEPTIMO,
                COUNT(CASE WHEN GRADO_COD = 08 THEN 1 END) AS OCTAVO,
                COUNT(CASE WHEN GRADO_COD = 09 THEN 1 END) AS NOVENO,
                COUNT(CASE WHEN GRADO_COD = 10 THEN 1 END) AS DECIMO,
                COUNT(CASE WHEN GRADO_COD = 11 THEN 1 END) AS ONCE,
                COUNT(CASE WHEN GRADO_COD = 23 THEN 1 END) AS VENTITRES,
                COUNT(CASE WHEN GRADO_COD = 24 THEN 1 END) AS VENTICUATO,
                COUNT(CASE WHEN GRADO_COD = 25 THEN 1 END) AS VENTICINCO,
                COUNT(CASE WHEN GRADO_COD = 26 THEN 1 END) AS VENTICEIS

            FROM
                nombre_de_tabla
            WHERE
                ESTADO = 'MATRICULADO'
                GROUP BY INSTITUCION;
            `)
            res.status(200).json(result);
    }catch (err){
        res.status(500).json({
            message : "Error al momento de listar el total de los genero por institucion" ,err
        })
    }
}
