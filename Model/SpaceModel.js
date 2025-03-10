import mongoose, { Mongoose } from "mongoose";


const SpaceSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true }, // Remove any 'unique' constraint if present
    longitude: { type: Number, required: true },
    parking_type: { type: String, enum: ["2-wheeler", "4-wheeler"], required: true },
    price_per_hour: { type: Number, required: true },
});

export const SpaceModel = mongoose.model("space", SpaceSchema);
