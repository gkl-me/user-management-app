import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

//@desc    authUser
//route    POST /api/users/login
//@access  Public
const authUser = async(req:Request,res:Response) => {
    res.status(200).json({message:'Auth user'})
}


//@desc    registerUser
//route    POST /api/users/
//@access  Public
const registerUser = async(req:Request,res:Response) => {
    res.status(200).json({message:'Register user'})
}


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