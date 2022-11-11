require('reflect-metadata');
const express = require('express');
const path = require('path');
const cors = require('cors');

import { AppDataSource } from "./data-source";

import uploadRouter from './routes/upload.route.js';
import userRouter from './routes/user.route.js';

const __dirname = path.resolve();
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json({ extended: true}));

app.listen(PORT, () => {
    console.log('server is listen');
})

AppDataSource.initialize().then(() => {
    app.get('/', (req: any, res: any) => {
        res.send('Server is listen!')
    })
}).catch((error) => {
    app.get('/', (req: any, res: any) => {
        res.send('Database conection error:' + error)
    })
});

app.use('/api', uploadRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRouter);