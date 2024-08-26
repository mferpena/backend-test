import { VehicleType } from "./VehicleType";

export class Vehicle {
    plateNumber: string;
    type: VehicleType;
    registrationStartDate: Date;
    accumulatedTime?: number;

    constructor(plateNumber: string, type: VehicleType, accumulatedTime?: number) {
        this.plateNumber = plateNumber;
        this.type = type;
        this.registrationStartDate = new Date();
        this.accumulatedTime = accumulatedTime;
    }

    toDBObject(): any {
        return {
            plateNumber: this.plateNumber,
            type: this.type,
            registrationStartDate: this.registrationStartDate,
            accumulatedTime: this.accumulatedTime,
        };
    }

    static fromDBObject(obj: any): Vehicle {
        return new Vehicle(
            obj.plateNumber,
            obj.type,
            obj.accumulatedTime
        );
    }
}