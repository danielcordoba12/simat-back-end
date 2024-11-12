import  express, { response } from 'express';
import  ExcelJS  from 'exceljs';
import bodyParser from 'body-parser';


export const createExcelFile = (req,res ) => {
    const {infoSedes,selectedValue} = req.body;
    
    


    // console.log("Este es el valor final  de infosedes",infoSedes[0][1].femenino);
    // console.log("hola desde el backend");
    
    if (!infoSedes || infoSedes.length === 0) {
        return res.status(400).json({ error: "No se han proporcionado datos de sedes" });
    }


    
    const workbook = new ExcelJS.Workbook();

    
    for (let i = 0; i < infoSedes.length; i++) {
        console.log("Esta es la iteracion mayor");
        // console.log("Info sedes", infoSedes[i][0].sede);
        // const year = infoSedes[i].ano;
        // console.log(`nombre de la hoja ${infoSedes[i][i].sede}`  );
        let worksheet = workbook.addWorksheet(`${infoSedes[i][0].sede}`);



        // for (let x = 1; x < infoSedes[i].length; x++){
            // console.log("Esta es la iteracion menor",infoSedes[i][x].grado_cod);
            

            

        // const dateFull =  new Date();

        worksheet.columns = [
            { header: '', key: '', width: 18 },
            { header: '', key: '', width: 15 },
            { header: '', key: '', width: 9 },
            { header: '', key: '', width: 23 }
        ];

        worksheet.mergeCells('A1:D2');
        worksheet.mergeCells('A6:B6');
        worksheet.mergeCells('A10:B10');

        const fontStyle = { name: 'Arial', size: 12 };


        // const columnsToStyle = [1, 2,3,4,5,6,7,8]; // Índices de columnas a estilizar (1 para la primera columna, 2 para la segunda, etc.)
        //     columnsToStyle.forEach(columnIndex => {
        //         worksheet.getColumn(columnIndex).eachCell({ includeEmpty: true }).forEach(cell => {
        //             cell.font = fontStyle; // Aplicar el estilo de fuente
        //         });
        //     });
        worksheet.getColumn(1).font = fontStyle; // Aplica el estilo a toda la columna 1
        worksheet.getColumn(2).font = fontStyle; // Aplica el estilo a toda la columna 2
        worksheet.getColumn(3).font = fontStyle
        worksheet.getColumn(4).font = fontStyle
        worksheet.getColumn(5).font = fontStyle
        worksheet.getColumn(6).font = fontStyle
        worksheet.getColumn(7).font = fontStyle
        worksheet.getColumn(8).font = fontStyle

        const celdas = ['A1','A3','A4','A5','A6','A10','C3','D3']

        
        
        // Definir ancho de columnas
        worksheet.getCell('A1').value =  selectedValue
        worksheet.getCell('A3').value = 'AÑO'

        worksheet.getCell('A4').value = 'SEDE'
        worksheet.getCell('B4').value = infoSedes[i][0].sede

        worksheet.getCell('A5').value = 'ZONA'
        worksheet.getCell('B5').value = 'RURAL'


        worksheet.getCell('A6').value = 'ESTADO'

        worksheet.getCell('A7').value = 'MATRICULADO'
        worksheet.getCell('B7').value = infoSedes[i][0].total_matriculados


        worksheet.getCell('A8').value = 'REPROBADO'
        // worksheet.getCell('B8').value = infoSedes[i][0].retirados
        worksheet.getCell('B8').value = 0
        

        worksheet.getCell('A9').value = 'RETIRADOS'
        worksheet.getCell('B9').value = infoSedes[i][0].retirados

        worksheet.getCell('A10').value = 'GENERO'

        worksheet.getCell('A11').value = 'MASCULINO'
        worksheet.getCell('B11').value = infoSedes[i][0].masculino

        worksheet.getCell('A12').value = 'FEMENINO'
        worksheet.getCell('B12').value = infoSedes[i][0].femenino



        worksheet.getCell('B3').value = infoSedes[i][0].ano
        worksheet.getCell('C3').value = 'GRADO'
        worksheet.getCell('C4').value = '00°'
        worksheet.getCell('C5').value = '01°'
        worksheet.getCell('C6').value = '02°'
        worksheet.getCell('C7').value = '03°'
        worksheet.getCell('C8').value = '04°'
        worksheet.getCell('C9').value = '05°'
        worksheet.getCell('C10').value = '06°'
        worksheet.getCell('C11').value = '07°'
        worksheet.getCell('C12').value = '08°'
        worksheet.getCell('C13').value = '09°'
        worksheet.getCell('C14').value = '10°'
        worksheet.getCell('C15').value = '11°'


        worksheet.getCell('D3').value = 'TOTAL POR GRADO';
        worksheet.getCell('D4').value = infoSedes[i][1]?.total_matriculados > 0 ? `${infoSedes[i][1].total_matriculados} Estudiantes` : '0 Estudiantes';
        worksheet.getCell('D5').value = infoSedes[i][2]?.total_matriculados > 0 ? `${infoSedes[i][2].total_matriculados} Estudiantes` : '0 Estudiantes'; 
        worksheet.getCell('D6').value = infoSedes[i][3]?.total_matriculados > 0 ? `${infoSedes[i][3].total_matriculados} Estudiantes` : '0 Estudiantes';  
        worksheet.getCell('D7').value = infoSedes[i][4]?.total_matriculados > 0  ? `${infoSedes[i][4].total_matriculados} Estudiantes` : '0 Estudiantes';  
        worksheet.getCell('D8').value = infoSedes[i][5]?.total_matriculados > 0 ? `${infoSedes[i][5].total_matriculados} Estudiantes` : '0 Estudiantes';  
        worksheet.getCell('D9').value = infoSedes[i][6]?.total_matriculados > 0 ? `${infoSedes[i][6].total_matriculados} Estudiantes` : '0 Estudiantes';   
        worksheet.getCell('D10').value = infoSedes[i][7]?.total_matriculados > 0 ? `${infoSedes[i][7].total_matriculados} Estudiantes` : '0 Estudiantes';   
        worksheet.getCell('D11').value = infoSedes[i][8]?.total_matriculados > 0 ? `${infoSedes[i][8].total_matriculados} Estudiantes` : '0 Estudiantes';    
        worksheet.getCell('D12').value = infoSedes[i][9]?.total_matriculados > 0 ? `${infoSedes[i][9].total_matriculados} Estudiantes` : '0 Estudiantes';    
        worksheet.getCell('D13').value = infoSedes[i][10]?.total_matriculados > 0 ? `${infoSedes[i][10].total_matriculados} Estudiantes` : '0 Estudiantes';   
        worksheet.getCell('D14').value = infoSedes[i][11]?.total_matriculados > 0 ? `${infoSedes[i][11].total_matriculados} Estudiantes` : '0 Estudiantes';   
        worksheet.getCell('D15').value = infoSedes[i][12]?.total_matriculados > 0 ? `${infoSedes[i][12].total_matriculados} Estudiantes` : '0 Estudiantes';
    
        
        
        const centrarCeldas = ["A1","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","C3" ,"C4", "C5", "C6","C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15",];


        // Agregar datos en filas específicas
        // worksheet.addRow({ nombre: 'Ana', edad: 25, ciudad: 'Madrid' });
        // worksheet.addRow({ nombre: 'Luis', edad: 30, ciudad: 'Barcelona' });

        // Combinar celdas A1 y B1



        // Cambiar el estilo de letra en la celda A1

        celdas.forEach(cell => {
            worksheet.getCell(cell).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'C6E0B4' }  
            };
            worksheet.getCell(cell).font = {
                bold: true, 
                name: 'Arial',
                size: 12
            };

        })

        centrarCeldas.forEach(cell => {
            worksheet.getCell(cell).alignment={
                vertical: 'middle',
                horizontal: 'center'
            }
        })
        
        // Cambiar el estilo de letra en la celda C1
        worksheet.getCell('C1').font = {
            name: 'Arial',
            size: 12,
            color: { argb: '0000' }
        };
        // Aplicar bordes negros a todas las celdas de un rango
        const range = ['A1','A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15'];

        range.forEach(cell => {
            worksheet.getCell(cell).border = {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } }
            };
        });
            // }
            
        }

    


    // Guardar el archivo Excel
      // Guardar el archivo temporalmente en el servidor
    // Generar el archivo en un buffer y enviarlo al cliente
    workbook.xlsx.writeBuffer().then(buffer => {
        res.setHeader('Content-Disposition', `attachment; filename="${selectedValue}.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }).catch(err => {
        res.status(500).json({ error: 'Error al generar el archivo',err });
    });


}





export const editIndicePoblacion = async (req, res) => {
    const  {response}  = req.body;
    const  {response2} = req.body;



    // Verificar si response1 o response2 están presentes
    if (!response || !response2) {
        return res.status(400).json({ error: "No se han proporcionado datos de sedes" });
    }

    const workbook = new ExcelJS.Workbook();
    const ruta = 'indice de poblacion.xlsx';
    // console.log(response);
    
    try {
        // Leer el archivo Excel de forma asíncrona
        await workbook.xlsx.readFile(ruta);
        const worksheet = workbook.getWorksheet(1);





        if (!worksheet) {
            console.error('No existe la hoja en el archivo excel');
            throw new Error('La hoja de trabajo no existe.');
            
        }
        
        // Aquí puedes realizar las modificaciones que necesites en el worksheet
        // Ejemplo de modificación: 
        // worksheet.getCell('A1').value = response1[0]; // Cambia el valor de la celda A1
        worksheet.getCell('B4').value = response[0].masculino || 0;
        worksheet.getCell('C4').value = response[0].femenino || 0;

        worksheet.getCell('B5').value = response[2].masculino
        worksheet.getCell('C5').value = response[2].femenino

        worksheet.getCell('B6').value = response[3].masculino
        worksheet.getCell('C6').value = response[3].femenino
        
        worksheet.getCell('B7').value = response[4].masculino
        worksheet.getCell('C7').value = response[4].femenino

        worksheet.getCell('B8').value = response[1].masculino
        worksheet.getCell('C8').value = response[1].femenino

        

///////////////////////CANTIDAD DE NIÑOS EN FORMACION POR INSTITUCION


        worksheet.getCell('E4').value = response2[0].PRESCOLAR
        worksheet.getCell('F4').value = response2[0].PRIMARIA
        worksheet.getCell('G4').value = response2[0].SECUNDARIA
        worksheet.getCell('H4').value = response2[0].MEDIA


        worksheet.getCell('E5').value = response2[2].PRESCOLAR
        worksheet.getCell('F5').value = response2[2].PRIMARIA
        worksheet.getCell('G5').value = response2[2].SECUNDARIA
        worksheet.getCell('H5').value = response2[2].MEDIA


        worksheet.getCell('E6').value = response2[3].PRESCOLAR
        worksheet.getCell('F6').value = response2[3].PRIMARIA
        worksheet.getCell('G6').value = response2[3].SECUNDARIA
        worksheet.getCell('H6').value = response2[3].MEDIA


        worksheet.getCell('E7').value = response2[4].PRESCOLAR
        worksheet.getCell('F7').value = response2[4].PRIMARIA
        worksheet.getCell('G7').value = response2[4].SECUNDARIA
        worksheet.getCell('H7').value = response2[4].MEDIA

        

        worksheet.getCell('E8').value = response2[1].PRESCOLAR
        worksheet.getCell('F8').value = response2[1].PRIMARIA
        worksheet.getCell('G8').value = response2[1].SECUNDARIA
        worksheet.getCell('H8').value = response2[1].MEDIA


///////////////////DISCAPADIDAD//////////////////////////////////
        worksheet.getCell('M4').value = response[0].total_con_discapacidad
        worksheet.getCell('M5').value = response[2].total_con_discapacidad
        worksheet.getCell('M6').value = response[3].total_con_discapacidad
        worksheet.getCell('M7').value = response[4].total_con_discapacidad
        worksheet.getCell('M8').value = response[1].total_con_discapacidad


        



        // Guardar el archivo Excel después de realizar modificaciones
        await workbook.xlsx.writeFile(ruta); // Guarda con un nuevo nombre o el mismo
        console.log('Archivo modificado exitosamente.');

        // Enviar respuesta al cliente
        return res.status(200).json({ message: "Archivo modificado exitosamente." });

    } catch (error) {
        console.error('Error al modificar el archivo:', error);
        return res.status(500).json({ error: "Ocurrió un error al procesar el archivo." });
    }
};


export const  studentSenrolled = async (req, res ) => {
    const data = req.body
    const response = data.dataResponse

    console.log("esta es lo que recibe el back-end",response[0]);
    
    const workbook = new ExcelJS.Workbook();
    const ruta = 'indice de poblacion.xlsx';


    try {
        // Leer el archivo Excel de forma asíncrona
        await workbook.xlsx.readFile(ruta);
        const worksheet = workbook.getWorksheet(2);





        if (!worksheet) {
            console.error('No existe la hoja en el archivo excel');
            throw new Error('La hoja de trabajo no existe.');
            
        }
        
        // Aquí puedes realizar las modificaciones que necesites en el worksheet
        // Ejemplo de modificación: 
        // worksheet.getCell('A1').value = response1[0]; // Cambia el valor de la celda A1
        worksheet.getCell('B6').value = response[4].PRESCOLAR || 0;
        worksheet.getCell('C6').value = response[4].PRIMERO || 0;
        worksheet.getCell('D6').value = response[4].SEGUNDO || 0;
        worksheet.getCell('E6').value = response[4].TERCERO || 0;
        worksheet.getCell('F6').value = response[4].CUARTO || 0;
        worksheet.getCell('G6').value = response[4].QUINTO || 0;
        worksheet.getCell('H6').value = response[4].SEXTO || 0;
        worksheet.getCell('I6').value = response[4].SEPTIMO || 0;
        worksheet.getCell('J6').value = response[4].OCTAVO || 0;
        worksheet.getCell('K6').value = response[4].NOVENO || 0;
        worksheet.getCell('L6').value = response[4].DECIMO || 0;
        worksheet.getCell('M6').value = response[4].ONCE || 0;
        worksheet.getCell('N6').value = response[4].VENTITRES || 0;
        worksheet.getCell('O6').value = response[4].VENTICUATO || 0;
        worksheet.getCell('P6').value = response[4].VENTICINCO || 0;
        worksheet.getCell('Q6').value = response[4].VENTICEIS || 0;




        worksheet.getCell('B7').value = response[2].PRESCOLAR || 0;
        worksheet.getCell('C7').value = response[2].PRIMERO || 0;
        worksheet.getCell('D7').value = response[2].SEGUNDO || 0;
        worksheet.getCell('E7').value = response[2].TERCERO || 0;
        worksheet.getCell('F7').value = response[2].CUARTO || 0;
        worksheet.getCell('G7').value = response[2].QUINTO || 0;
        worksheet.getCell('H7').value = response[2].SEXTO || 0;
        worksheet.getCell('I7').value = response[2].SEPTIMO || 0;
        worksheet.getCell('J7').value = response[2].OCTAVO || 0;
        worksheet.getCell('K7').value = response[2].NOVENO || 0;
        worksheet.getCell('L7').value = response[2].DECIMO || 0;
        worksheet.getCell('M7').value = response[2].ONCE || 0;
        worksheet.getCell('N7').value = response[2].VENTITRES || 0;
        worksheet.getCell('O7').value = response[2].VENTICUATO || 0;
        worksheet.getCell('P7').value = response[2].VENTICINCO || 0;
        worksheet.getCell('Q7').value = response[2].VENTICEIS || 0;


        worksheet.getCell('B8').value = response[0].PRESCOLAR || 0;
        worksheet.getCell('C8').value = response[0].PRIMERO || 0;
        worksheet.getCell('D8').value = response[0].SEGUNDO || 0;
        worksheet.getCell('E8').value = response[0].TERCERO || 0;
        worksheet.getCell('F8').value = response[0].CUARTO || 0;
        worksheet.getCell('G8').value = response[0].QUINTO || 0;
        worksheet.getCell('H8').value = response[0].SEXTO || 0;
        worksheet.getCell('I8').value = response[0].SEPTIMO || 0;
        worksheet.getCell('J8').value = response[0].OCTAVO || 0;
        worksheet.getCell('K8').value = response[0].NOVENO || 0;
        worksheet.getCell('L8').value = response[0].DECIMO || 0;
        worksheet.getCell('M8').value = response[0].ONCE || 0;
        worksheet.getCell('N8').value = response[0].VENTITRES || 0;
        worksheet.getCell('O8').value = response[0].VENTICUATO || 0;
        worksheet.getCell('P8').value = response[0].VENTICINCO || 0;
        worksheet.getCell('Q8').value = response[0].VENTICEIS || 0;


        worksheet.getCell('B9').value = response[1].PRESCOLAR || 0;
        worksheet.getCell('C9').value = response[1].PRIMERO || 0;
        worksheet.getCell('D9').value = response[1].SEGUNDO || 0;
        worksheet.getCell('E9').value = response[1].TERCERO || 0;
        worksheet.getCell('F9').value = response[1].CUARTO || 0;
        worksheet.getCell('G9').value = response[1].QUINTO || 0;
        worksheet.getCell('H9').value = response[1].SEXTO || 0;
        worksheet.getCell('I9').value = response[1].SEPTIMO || 0;
        worksheet.getCell('J9').value = response[1].OCTAVO || 0;
        worksheet.getCell('K9').value = response[1].NOVENO || 0;
        worksheet.getCell('L9').value = response[1].DECIMO || 0;
        worksheet.getCell('M9').value = response[1].ONCE || 0;
        worksheet.getCell('N9').value = response[1].VENTITRES || 0;
        worksheet.getCell('O9').value = response[1].VENTICUATO || 0;
        worksheet.getCell('P9').value = response[1].VENTICINCO || 0;
        worksheet.getCell('Q9').value = response[1].VENTICEIS || 0;


        
        worksheet.getCell('B10').value = response[3].PRESCOLAR || 0;
        worksheet.getCell('C10').value = response[3].PRIMERO || 0;
        worksheet.getCell('D10').value = response[3].SEGUNDO || 0;
        worksheet.getCell('E10').value = response[3].TERCERO || 0;
        worksheet.getCell('F10').value = response[3].CUARTO || 0;
        worksheet.getCell('G10').value = response[3].QUINTO || 0;
        worksheet.getCell('H10').value = response[3].SEXTO || 0;
        worksheet.getCell('I10').value = response[3].SEPTIMO || 0;
        worksheet.getCell('J10').value = response[3].OCTAVO || 0;
        worksheet.getCell('K10').value = response[3].NOVENO || 0;
        worksheet.getCell('L10').value = response[3].DECIMO || 0;
        worksheet.getCell('M10').value = response[3].ONCE || 0;
        worksheet.getCell('N10').value = response[3].VENTITRES || 0;
        worksheet.getCell('O10').value = response[3].VENTICUATO || 0;
        worksheet.getCell('P10').value = response[3].VENTICINCO || 0;
        worksheet.getCell('Q10').value = response[3].VENTICEIS || 0;



        // Guardar el archivo Excel después de realizar modificaciones
        const buffer = await workbook.xlsx.writeBuffer();

        // Configurar los encabezados para la descarga
        res.setHeader('Content-Disposition', 'attachment; filename=indice_poblacion_modificado.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Enviar el archivo como respuesta
        return res.status(200).send(buffer);

    } catch (error) {
        console.error('Error al modificar el archivo:', error);
        return res.status(500).json({ error: "Ocurrió un error al procesar la segunda hoja." });
    }
}
