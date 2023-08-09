import express from 'express';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/router.js';
import cors from 'cors';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', Router);

const PORT = 8000;
app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}`));

const uname = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
DBConnection(uname, pass);