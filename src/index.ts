import express from 'express';
import { convertRouter } from './routes/convert';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/api/convert', convertRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});