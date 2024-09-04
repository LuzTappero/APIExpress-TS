import multer from 'multer';
import FormData from 'form-data';
import path from 'path';
import { fileURLToPath } from 'url';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../../images'); // Cambia a la carpeta donde quieres guardar los archivos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Guarda con un nombre único
    }
});

const upload = multer({ storage: storage });

export default upload