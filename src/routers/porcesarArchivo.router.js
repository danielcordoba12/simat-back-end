// src/routers/porcesarArchivo.router.js
import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/procesarArchivosController.js'; // Importar correctamente

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('archivo'), uploadFile);

export default router; // Exportación por defecto
    