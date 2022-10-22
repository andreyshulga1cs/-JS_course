import express from 'express';
import path from 'path';
import cors from 'cors';

import router from './routes/upload.route.js';

const __dirname = path.resolve();
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json({ extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', router);


app.listen(PORT, () => {
    console.log('server is listen');
})
app.get('/', (req, res) => {
    res.send('hello world')
})