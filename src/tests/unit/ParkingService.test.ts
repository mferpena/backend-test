import { ParkingService } from '@core/ParkingService';
import { IParkingRepository } from '@core/ports/IParkingRepository';
import { ParkingRecord } from '@core/domain/models/ParkingRecord';
import { VehicleType } from '@core/domain/models/VehicleType';
import { Vehicle } from '@core/domain/models/Vehicle';

describe('ParkingService', () => {
    let parkingService: ParkingService;
    let mockParkingRepository: jest.Mocked<IParkingRepository>;

    beforeEach(() => {
        mockParkingRepository = {
            addVehicle: jest.fn(),
            getVehicle: jest.fn(),
            addParkingRecord: jest.fn(),
            getParkingRecord: jest.fn(),
            updateParkingRecord: jest.fn(),
        };

        parkingService = new ParkingService(mockParkingRepository);
    });

    describe('registerExit', () => {
        it('should return an error if the parking record is not found', async () => {
            mockParkingRepository.getParkingRecord.mockResolvedValue(null);

            await expect(parkingService.registerExit('XYZ789')).rejects.toThrow('Parking record not found');
        });

        it('should return an error if the vehicle is not found', async () => {
            const record = new ParkingRecord('XYZ789', new Date());
            mockParkingRepository.getParkingRecord.mockResolvedValue(record);
            mockParkingRepository.getVehicle.mockResolvedValue(null);

            await expect(parkingService.registerExit('XYZ789')).rejects.toThrow('Vehicle not found');
        });

        it('should register an exit successfully for a resident vehicle', async () => {
            const now = new Date();
            const vehicle = new Vehicle('ABC123', VehicleType.RESIDENT);
            const record = new ParkingRecord('ABC123', new Date(now.getTime() - 60 * 60 * 1000));

            mockParkingRepository.getParkingRecord.mockResolvedValue(record);
            mockParkingRepository.getVehicle.mockResolvedValue(vehicle);
            mockParkingRepository.updateParkingRecord.mockResolvedValue(undefined);

            const result = await parkingService.registerExit('ABC123');

            expect(result.plateNumber).toBe('ABC123');
            expect(result.amount).toBeGreaterThan(0);
            expect(result.paymentDueDate).toBeDefined();
            expect(result.message).toBe('Resident vehicle. Payment due at the end of the month.');
        });

        it('should calculate amount charged for non-resident vehicles', async () => {
            const now = new Date();
            const vehicle = new Vehicle('XYZ789', VehicleType.NON_RESIDENT);
            const record = new ParkingRecord('XYZ789', new Date(now.getTime() - 30 * 60 * 1000));

            mockParkingRepository.getParkingRecord.mockResolvedValue(record);
            mockParkingRepository.getVehicle.mockResolvedValue(vehicle);
            mockParkingRepository.updateParkingRecord.mockResolvedValue(undefined);

            const result = await parkingService.registerExit('XYZ789');

            expect(result.plateNumber).toBe('XYZ789');
            expect(result.amount).toBeGreaterThan(0);
        });

        it('should return an error if exit is already registered for this entry', async () => {
            const now = new Date();
            const vehicle = new Vehicle('ABC123', VehicleType.NON_RESIDENT);
            const record = new ParkingRecord('ABC123', new Date(now.getTime() - 60 * 60 * 1000));
            record.exitTime = new Date();

            mockParkingRepository.getParkingRecord.mockResolvedValue(record);
            mockParkingRepository.getVehicle.mockResolvedValue(vehicle);

            await expect(parkingService.registerExit('ABC123')).rejects.toThrow('Exit already registered for this entry');
        });
    });
});
