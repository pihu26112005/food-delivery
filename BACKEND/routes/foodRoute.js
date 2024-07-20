import express from 'express';
import multer from 'multer';
import {addfood,listfood,removefood} from '../controllers/foodController.js';

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const foodRouter = express.Router();

foodRouter.post('/add',upload.single("image"), addfood);
foodRouter.get('/list',listfood);
foodRouter.post('/remove',removefood);







export   default foodRouter;