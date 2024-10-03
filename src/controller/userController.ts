import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import validator  from 'validator'
import User from '../models/userModel'
import generateToken from '../utils/generateToken'

//@desc    authUser
//route    POST /api/users/login
//@access  Public
const authUser = asyncHandler( async(req:Request,res:Response) => {

    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    } 
})


//@desc    registerUser
//route    POST /api/users/
//@access  Public
const registerUser = asyncHandler(async (req:Request,res:Response) => {

    const {name,email,password} = req.body;
    
    if(!(name && email && password)){
        throw new Error('Invalid inputs')
    }

    if(!validator.isEmail(email)){
        res.status(400)
        throw new Error('Invalid email')
    }


    if(!validator.isStrongPassword(password)){
        res.status(400)
        throw new Error('Password must have of length 8 including UpperCase, LowerCase, Number and Special Char')
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exits')
    }

    const user = await User.create({
        name,email,password
    })

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//@desc    getUserProfile
//route    GET /api/users/profile
//@access  Private
const getUserProfile = async(req:Request,res:Response) => {
    res.status(200).json({message:'user profile'})
}


//@desc    updateUserProfile
//route    PUT /api/users/profile
//@access  Public
const updateUserProfile = async(req:Request,res:Response) => {
    res.status(200).json({message:'update user'})
}

//@desc    logout
//route    POST /api/users/logout
//@access  Public
const logout = async(req:Request,res:Response) => {
    res.status(200).json({message:'user logout'})
}


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logout
}