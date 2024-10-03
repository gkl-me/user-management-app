import mongoose, { Document } from "mongoose";
import bcrypt from 'bcryptjs'

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

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) next();

    const salt = await  bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User',userSchema);

export default User;