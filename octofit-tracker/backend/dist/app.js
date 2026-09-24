import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import apiRoutes from './routes/index.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
    res.json({
        app: 'OctoFit Tracker API',
        version: '1.0.0',
        status: 'running',
    });
});
app.use('/api', apiRoutes);
export default app;
