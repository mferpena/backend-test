import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGO_URI', 'PORT', 'RESIDENT_RATE', 'NON_RESIDENT_RATE'];

const validateEnvVars = () => {
    requiredEnvVars.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Missing environment variable: ${variable}`);
        }
    });
};

validateEnvVars();

export class Environments {
    static get mongoUri(): string {
        return process.env.MONGO_URI!;
    }

    static get port(): number {
        return parseInt(process.env.PORT!, 10);
    }

    static get residentRate(): number {
        return parseFloat(process.env.RESIDENT_RATE!);
    }

    static get nonResidentRate(): number {
        return parseFloat(process.env.NON_RESIDENT_RATE!);
    }
}

