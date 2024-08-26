import { Router, Express } from 'express';
import { ParkingController } from '@controllers/ParkingController';
import { validateSchema } from '../middleware/ValidationMiddleware';
import { ParkingRepository } from '../../secondary/persistence/ParkingRepository';
import { ParkingService } from '@core/ParkingService';
import { registerEntrySchema, registerExitSchema, registerVehicle } from '@controllers/dto/VehicleDto';

export function vehicleRoutes(app: Express, prefix: string) {
    const parkingRepository = new ParkingRepository();
    const parkingService = new ParkingService(parkingRepository);
    const parkingController = new ParkingController(parkingService);

    const router = Router();

    router.post('/register-entry', validateSchema(registerEntrySchema), parkingController.registerEntry);
    router.post('/register-exit', validateSchema(registerExitSchema), parkingController.registerExit);
    router.post('/register-official', validateSchema(registerVehicle), parkingController.addOfficialVehicle);
    router.post('/register-resident', validateSchema(registerVehicle), parkingController.addResidentVehicle);

    app.use(prefix, router);
}