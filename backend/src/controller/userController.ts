import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import validator  from 'validator'
import User from '../models/userModel'
import generateToken from '../utils/generateToken'
import { AuthenticatedRequest } from '../middleware/authMiddleware'
import path from 'path'
import fs from 'fs'
import { uploadCloudinary } from '../utils/cloudinary'
import { Error } from 'mongoose'

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
            email:user.email,
            image:user.image||""
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
            email:user.email,
            image:user.image||""
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//@desc    getUserProfile
//route    GET /api/users/profile
//@access  Private
const getUserProfile =asyncHandler( async(req:AuthenticatedRequest,res:Response) => {
    const user = req.user
    res.status(200).json(user)
})


//@desc    updateUserProfile
//route    PUT /api/users/profile
//@access  Private
const updateUserProfile =asyncHandler( async(req:AuthenticatedRequest,res:Response) => {

    const user = await User.findById(req.user._id);

    if(user){

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        if(req.file){

            try {
                
                const cloudinaryRes = await uploadCloudinary(req.file.path)


                if(cloudinaryRes && cloudinaryRes.url){
                    user.image = cloudinaryRes.url;

                    fs.unlinkSync(req.file.path);
                }else {
                    throw new Error('Failed to upload image to cloudinary')
                }

            } catch (error) {

                if(req.file.path && fs.existsSync(req.file.path)){
                    fs.unlinkSync(req.file.path);
                }
                res.status(400)
                throw new Error('Error proccessing image upload')
            }

        }

        try {
            const updatedUser = await user.save();
        res.status(200).json(
           {
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            image:updatedUser.image
           }
        )
        } catch (error) {
            res.status(400)
            throw new Error('User email already exists')
        }
        
        
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc    logout
//route    POST /api/users/logout
//@access  Public
const logout = asyncHandler( async(req:Request,res:Response) => {

    res.cookie(
        'jwt',
        "",
        {
            httpOnly:true,
            expires: new Date(0)
        }
    )

    res.status(200).json({message:'User logged out'})
})


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logout
}