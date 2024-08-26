import mongoose, { Document, Schema } from 'mongoose';

export interface ParkingRecordDocument extends Document {
    plateNumber: string;
    entryTime: Date;
    exitTime?: Date;
}

const ParkingRecordSchema: Schema = new Schema({
    plateNumber: { type: String, required: true },
    entryTime: { type: Date, required: true },
    exitTime: { type: Date },
});

export const ParkingRecordModel = mongoose.model<ParkingRecordDocument>('ParkingRecord', ParkingRecordSchema);
