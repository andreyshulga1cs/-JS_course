require('reflect-metadata');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

import { AppDataSource } from "./data-source";

import uploadRouter from './routes/upload.route.js';
import userRouter from './routes/user.route.js';

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.json({ extended: true}));

app.listen(PORT, () => {
    console.log('server is listens');
})

AppDataSource.initialize().then(() => {
    app.get('/', (req: any, res: any) => {
        res.send('Server is listens!')
    })
}).catch((error) => {
    app.get('/', (req: any, res: any) => {
        res.send('Database conection error:' + error)
    })
});

app.use('/api', uploadRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRouter);