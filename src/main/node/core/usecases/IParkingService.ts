export interface IParkingService {
    registerEntry(plateNumber: string): Promise<void>;
    registerExit(plateNumber: string): Promise<{ plateNumber: string; amount?: number; paymentDueDate?: Date; message?: string }>;
    addOfficialVehicle(plateNumber: string): Promise<void>;
    addResidentVehicle(plateNumber: string): Promise<void>;
}