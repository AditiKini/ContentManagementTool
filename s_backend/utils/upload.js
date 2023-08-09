import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const uname = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${uname}:${pass}@blog-application.x0c2dec.mongodb.net/`,
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            fileType: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});


export default multer({storage}); 