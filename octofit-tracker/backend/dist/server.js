import app from './app.js';
import { connectDatabase } from './config/database.js';
const PORT = Number(process.env.PORT || 8000);
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
