import mongoose, { Document, Types } from "mongoose";
import bcrypt from 'bcryptjs'

interface UserDocument extends Document {
    _id: Types.ObjectId,
    name:string,
    email:string,
    password:string,
    image?:string
    matchPassword: (password: string) => Promise<boolean>;
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

userSchema.methods.matchPassword = async function(password:string){
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model<UserDocument>('User',userSchema);

export default User;