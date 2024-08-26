export class ParkingRecord {
    constructor(
        public plateNumber: string,
        public entryTime: Date,
        public exitTime?: Date
    ) { }

    getDurationInMinutes(): number {
        if (!this.exitTime) {
            throw new Error('Exit time is not set');
        }
        return Math.floor((this.exitTime.getTime() - this.entryTime.getTime()) / 60000);
    }
}
