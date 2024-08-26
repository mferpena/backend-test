import { VehicleType } from '@core/domain/models/VehicleType';
import mongoose, { Document, Schema } from 'mongoose';

export interface VehicleDocument extends Document {
    plateNumber: string;
    type: VehicleType;
    registrationStartDate?: Date;
    accumulatedTime?: number;
}

const vehicleSchema = new Schema({
    plateNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: Object.values(VehicleType), default: VehicleType.NON_RESIDENT },
    registrationStartDate: { type: Date, default: Date.now },
    accumulatedTime: { type: Number, default: 0 }
});

export const VehicleModel = mongoose.model<VehicleDocument>('Vehicle', vehicleSchema);
