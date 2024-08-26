import { ParkingRecord } from "@core/domain/models/ParkingRecord";
import { Vehicle } from "@core/domain/models/Vehicle";

export interface IParkingRepository {
    addVehicle(vehicle: Vehicle): Promise<void>;
    getVehicle(plateNumber: string): Promise<Vehicle | null>;
    addParkingRecord(record: ParkingRecord): Promise<void>;
    getParkingRecord(plateNumber: string): Promise<ParkingRecord | null>;
    updateParkingRecord(record: ParkingRecord): Promise<void>;
}