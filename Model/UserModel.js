import mongoose, { Mongoose } from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

});

 export const UserModel = mongoose.model("users",UserSchema);