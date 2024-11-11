import { pool } from "../database/conexion.js"


// export const listarSedes = async (req,res) => {
//     try{
//         const[result] = await pool.query (`SELECT SEDE FROM nombre_de_tabla  WHERE INSTITUCION ='INSTITUCION EDUCATIVA BUENOS AIRES' GROUP BY SEDE`);
//         res.status(200).json(result)
//     }catch(err) {
//         res.status(500).json({
//             message: "Error al momento de listar sedes" + err
//         })
//     }
// }
export const listarSedes = async (req,res) => {

    

    try{
        // console.log("esto es req", req);
        
        let institucion = req.params.institucion
        const[result] = await pool.query (`SELECT SEDE FROM nombre_de_tabla  WHERE INSTITUCION = '${institucion}' GROUP BY SEDE`);
        res.status(200).json(result)
        
    }catch(err) {
        res.status(500).json({
            message: "Error al momento de listar sedes" + err
        })
    }
}

export const listarInfoSedes = async (req,res) => {
    try {
        let sedes =  req.params.sedes
        // console.log("este la info de sedes que esta recibiendo elc backend",sedes, "y de tipo", typeof(sedes));
        // console.log("este la info de sedes",sedes[10]);
        // const obj = JSON.parse(sedes);
        // const obj = eval(`(${sedes})`); 
        // console.log("Conversion hecha", obj);
        

        // for( let i = 0; i <= sedes.leght; i++){
            const [result] = await pool.query (`
                    -- Lista de todos los grados que quieres incluir
                    WITH grados AS (
                        SELECT '00' AS grado_cod UNION ALL
                        SELECT '01' UNION ALL
                        SELECT '02' UNION ALL
                        SELECT '03' UNION ALL
                        SELECT '04' UNION ALL
                        SELECT '05'
                    )

                    -- Parte que obtiene la suma total de todos los datos
                    SELECT 
                        ano,
                        sede,
                        '0' AS grado_cod, -- Indicar que es el total
                        SUM(COALESCE(total_matriculados, 0)) AS total_matriculados,
                        SUM(COALESCE(masculino, 0)) AS masculino,
                        SUM(COALESCE(femenino, 0)) AS femenino,
                        SUM(COALESCE(retirados, 0)) AS retirados
                    FROM (
                        SELECT 
                            ano,
                            sede,
                            grado_cod,
                            COUNT(CASE WHEN estado = 'MATRICULADO' THEN 1 END) AS total_matriculados,
                            COUNT(CASE WHEN estado = 'RETIRADO' THEN 1 END) AS retirados,
                            COUNT(CASE WHEN genero = 'MASCULINO' AND estado = 'MATRICULADO' THEN 1 END) AS masculino,
                            COUNT(CASE WHEN genero = 'FEMENINO' AND estado = 'MATRICULADO' THEN 1 END) AS femenino
                        FROM 
                            nombre_de_tabla 
                        WHERE 
                            sede = '${sedes}'
                        GROUP BY 
                            ano, sede, grado_cod
                    ) AS sub
                    GROUP BY ano, sede

                    UNION ALL

                    -- Parte que asegura que todos los grados están presentes con valores 0
                    SELECT 
                        COALESCE(sub.ano, 2024) AS ano, -- Si no hay registros, puedes establecer un año predeterminado
                        COALESCE(sub.sede, '${sedes}') AS sede, -- Establece un valor predeterminado para sede
                        g.grado_cod,
                        COALESCE(sub.total_matriculados, 0) AS total_matriculados,
                        COALESCE(sub.masculino, 0) AS masculino,
                        COALESCE(sub.femenino, 0) AS femenino,
                        COALESCE(sub.retirados, 0) AS retirados
                    FROM 
                        grados g
                    LEFT JOIN (
                        SELECT 
                            ano,
                            sede,
                            grado_cod,
                            COUNT(CASE WHEN estado = 'MATRICULADO' THEN 1 END) AS total_matriculados,
                            COUNT(CASE WHEN estado = 'RETIRADO' THEN 1 END) AS retirados,
                            COUNT(CASE WHEN genero = 'MASCULINO' AND estado = 'MATRICULADO' THEN 1 END) AS masculino,
                            COUNT(CASE WHEN genero = 'FEMENINO' AND estado = 'MATRICULADO' THEN 1 END) AS femenino
                        FROM 
                            nombre_de_tabla 
                        WHERE 
                            sede = '${sedes}'
                        GROUP BY 
                            ano, sede, grado_cod
                    ) AS sub ON g.grado_cod = sub.grado_cod
                    ORDER BY 
                        ano, sede, grado_cod ASC;


                    `)
                res.status(200).json(result)
                // console.log("Esta es la sede",result);
                // console.log("Esta es la sede",sedes);

                
                // console.log("Esta es la ifno de sedes desde el backend",result);
                
            // console.log(`resultado: ${result}`);
        // }

            // console.log(`resultado2${i}: ${result}`);
            
    } catch (err) {
            res.status(500).json ({
            message: "Error al momento de listar sedes" + err
        })
    }
}