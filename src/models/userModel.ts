import mongoose, { Document } from "mongoose";

interface UserDocument extends Document {
    name:string,
    email:string,
    password:string,
    image?:string
}

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema);

export default User;