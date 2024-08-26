import cors from 'cors';
import express from 'express';
import { Logger } from './infrastructure/config/Logger';
import { setupSwagger } from './infrastructure/config/SwaggerConfig';
import { connectToDatabase } from './infrastructure/secondary/config/ConnectToDatabase';
import { Environments } from './infrastructure/config/Environments';
import { vehicleRoutes } from './infrastructure/primary/routes/VehicleRoutes';

const logger = new Logger('App');

const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    return app;
};

const startServer = async () => {
    try {
        const app = createApp();
        setupSwagger(app);
        await connectToDatabase();

        vehicleRoutes(app, '/api/v1/vehicles');

        const port = Environments.port;
        app.listen(port, () => {
            logger.info(`Server running on port ${port}`);
        });
    } catch (error: any) {
        logger.error('Error starting the server: {error}', error);
        process.exit(1);
    }
};

startServer();