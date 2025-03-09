import mongoose, { Mongoose } from "mongoose";


const SpaceSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    latitude:{
        type:String,
        required:true,
        unique:true
    },
    longitude:{
        type:String,
        required:true
    },
    parking_type:{
        type:String,
        required:true
    },
    price_per_hour:{
        type: Number,
        required:true
    },

});

 export const SpaceModel = mongoose.model("space",SpaceSchema);