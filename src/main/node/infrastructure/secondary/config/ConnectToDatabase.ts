import mongoose from 'mongoose';
import { Logger } from '../../config/Logger';
import { Environments } from '../../config/Environments';

const logger = new Logger('ConnectToDatabase');

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(Environments.mongoUri);
        logger.info(`Connected to MongoDB`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
