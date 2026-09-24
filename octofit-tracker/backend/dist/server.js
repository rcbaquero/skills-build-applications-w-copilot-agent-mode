import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database.js';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 8000);
app.use(cors());
app.use(express.json());
app.get('/api', (_req, res) => {
    res.json({
        name: 'OctoFit Tracker API',
        status: 'online',
    });
});
app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        message: 'OctoFit Tracker API is running',
        port: PORT,
    });
});
async function startServer() {
    try {
        await connectDatabase();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
