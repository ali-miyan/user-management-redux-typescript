import mongoose, { Schema, Document } from "mongoose";
import { userType } from '../types/userType'

const userSchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgUrl:String,
    isAdmin : {
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

const User = mongoose.model<userType>('User', userSchema)

export default User;