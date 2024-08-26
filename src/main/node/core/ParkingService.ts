import { IParkingRepository } from './ports/IParkingRepository';
import { IParkingService } from './usecases/IParkingService';
import { Environments } from '../infrastructure/config/Environments';
import { Vehicle } from './domain/models/Vehicle';
import { ParkingRecord } from './domain/models/ParkingRecord';
import { VehicleType } from './domain/models/VehicleType';

export class ParkingService implements IParkingService {
    private parkingRepository: IParkingRepository;

    constructor(parkingRepository: IParkingRepository) {
        this.parkingRepository = parkingRepository;
    }

    async addOfficialVehicle(plateNumber: string): Promise<void> {
        try {
            const vehicle = new Vehicle(plateNumber, VehicleType.OFFICIAL);
            await this.parkingRepository.addVehicle(vehicle);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async addResidentVehicle(plateNumber: string): Promise<void> {
        try {
            const vehicle = new Vehicle(plateNumber, VehicleType.RESIDENT);
            await this.parkingRepository.addVehicle(vehicle);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerEntry(plateNumber: string): Promise<void> {
        try {
            const existingRecord = await this.parkingRepository.getParkingRecord(plateNumber);
            if (existingRecord && !existingRecord.exitTime) {
                throw new Error('Vehicle is already inside.');
            }

            let vehicle = await this.parkingRepository.getVehicle(plateNumber);

            if (!vehicle) {
                vehicle = new Vehicle(plateNumber, VehicleType.NON_RESIDENT);
                await this.parkingRepository.addVehicle(vehicle);
            }

            const record = new ParkingRecord(plateNumber, new Date());
            await this.parkingRepository.addParkingRecord(record);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async registerExit(plateNumber: string): Promise<{ plateNumber: string; amount?: number; paymentDueDate?: Date; message?: string }> {
        try {
            const record = await this.parkingRepository.getParkingRecord(plateNumber);
            if (!record) {
                throw new Error('Parking record not found');
            }

            if (record.exitTime) {
                throw new Error('Exit already registered for this entry');
            }

            const vehicle = await this.parkingRepository.getVehicle(plateNumber);
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }

            record.exitTime = new Date();
            const durationInMinutes = record.getDurationInMinutes();
            await this.parkingRepository.updateParkingRecord(record);

            if (vehicle.type === VehicleType.NON_RESIDENT) {
                const charge = durationInMinutes * Environments.nonResidentRate;
                return { plateNumber, amount: charge };
            } else if (vehicle.type === VehicleType.RESIDENT) {
                const calculatePaymentDueDate = (registrationStartDate: Date): Date => {
                    const paymentDueDate = new Date(registrationStartDate);

                    paymentDueDate.setDate(paymentDueDate.getDate() + 30);

                    paymentDueDate.setHours(0, 0, 0, 0);

                    return paymentDueDate;
                };

                const paymentDueDate = calculatePaymentDueDate(vehicle.registrationStartDate);

                return {
                    plateNumber,
                    amount: durationInMinutes * Environments.residentRate,
                    paymentDueDate,
                    message: 'Resident vehicle. Payment due at the end of the month.'
                };
            }

            return { plateNumber, message: 'Exit registered successfully.' };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}
