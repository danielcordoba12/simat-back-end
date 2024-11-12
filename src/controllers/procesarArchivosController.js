import fs from 'fs';
import pool from '../database/conexion.js'; // Importar la configuración del pool

async function procesarArchivo(filePath) {
    const connection = await pool.getConnection();
    

    try {
        // Habilitar carga de archivos locales por seguridad (esto solo es necesario si no está habilitado globalmente)
        await connection.query("SET SESSION local_infile = 1");

        // Truncar la tabla antes de insertar los nuevos datos
        await connection.query('TRUNCATE TABLE nombre_de_tabla');

        // Comando para cargar datos usando LOAD DATA LOCAL INFILE
        const loadQuery = `
            LOAD DATA LOCAL INFILE ?
            INTO TABLE nombre_de_tabla
            FIELDS TERMINATED BY ';'
            LINES TERMINATED BY '\\n'
            IGNORE 1 LINES;
        `;
        console.log("loadquery", loadQuery);
        

        // Ejecutar la carga de datos usando la opción de archivo con streamFactory
        await connection.query({
            sql: loadQuery,
            values: [filePath],
            infileStreamFactory: (path) => fs.createReadStream(path),
        });

        console.log('Datos cargados con éxito');
    } catch (error) {
        console.error('Error al procesar el archivo:', error);
        throw error; // Lanza el error para manejarlo más adelante
    } finally {
        connection.release(); // Libera la conexión
        fs.unlinkSync(filePath); // Eliminar el archivo después de procesarlo
    }
}

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo');
    }

    try {
        await procesarArchivo(req.file.path);
        res.status(200).send('Archivo procesado y datos cargados con éxito');
    } catch (error) {
        console.error('Hubo un error al procesar el archivo', error);
        res.status(500).send('Hubo un error al procesar el archivo',error);
    }
};

export { uploadFile }; // Exportar la función
