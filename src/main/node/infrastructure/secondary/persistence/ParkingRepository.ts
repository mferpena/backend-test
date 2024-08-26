import { IParkingRepository } from '@core/ports/IParkingRepository';
import { ParkingRecordModel } from '../entities/ParkingRecordModel';
import { VehicleModel } from '../entities/VehicleModel';
import { Vehicle } from '@core/domain/models/Vehicle';
import { ParkingRecord } from '@core/domain/models/ParkingRecord';

export class ParkingRepository implements IParkingRepository {
    async addVehicle(vehicle: Vehicle): Promise<void> {
        const filter = { plateNumber: vehicle.plateNumber };
        const update = vehicle.toDBObject();
        const options = { upsert: true };
        await VehicleModel.updateOne(filter, update, options).exec();
    }

    async getVehicle(plateNumber: string): Promise<Vehicle | null> {
        const vehicleDocument = await VehicleModel.findOne({ plateNumber }).exec();
        return vehicleDocument ? Vehicle.fromDBObject(vehicleDocument) : null;
    }

    async addParkingRecord(record: ParkingRecord): Promise<void> {
        const existingRecord = await ParkingRecordModel.findOne({
            plateNumber: record.plateNumber,
            exitTime: { $exists: false }
        }).exec();

        if (existingRecord) {
            throw new Error('An active parking record already exists for this vehicle.');
        }

        const recordDocument = new ParkingRecordModel({
            plateNumber: record.plateNumber,
            entryTime: record.entryTime,
            exitTime: record.exitTime,
        });
        await recordDocument.save();
    }

    async getParkingRecord(plateNumber: string): Promise<ParkingRecord | null> {
        const recordDocument = await ParkingRecordModel.findOne({
            plateNumber,
            exitTime: { $exists: false }
        }).sort({ entryTime: -1 })
            .exec();

        if (recordDocument) {
            return new ParkingRecord(
                recordDocument.plateNumber,
                recordDocument.entryTime,
                recordDocument.exitTime
            );
        }
        return null;
    }

    async updateParkingRecord(record: ParkingRecord): Promise<void> {
        const filter = {
            plateNumber: record.plateNumber,
            entryTime: record.entryTime,
            exitTime: { $exists: false }
        };
        const update = { exitTime: record.exitTime };
        await ParkingRecordModel.updateOne(filter, update).exec();
    }

}