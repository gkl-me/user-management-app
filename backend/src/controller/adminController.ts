
import User from '../models/userModel'
import generateToken from '../utils/generateToken'
import validator from 'validator'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'


//@desc    adminLogin
//route    POST /api/admin/login
//@access  Public
const adminLogin = asyncHandler(async (req:Request,res:Response) => {
    const {email,password} = req.body

    const adminEmail = process.env.ADMIN_EMAIL!
    const adminPassword = process.env.ADMIN_PASSWORD!

    if(adminEmail===email && adminPassword===password){

        generateToken(res,adminEmail,'admin')

        const users = await User.find({}).select('_id name email');

        res.status(200).json({users})

    }else {
        res.status(401)
        throw new Error('Invaild password or email')
    }
})


//@desc    getAllUsers
//route    GET /api/admin/users
//@access  Private/admin
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find({}).select('_id name email');
    if(users){
        res.status(200).json({users})
    }else{
        res.status(400)
        throw new Error('Failed to get users')
    }
})


//@desc    searchUser
//route    GET /api/admin/users/search
//@access  Private/admin
const searchUser = asyncHandler(async (req,res) => {

    const {search} = req.query;

    let query = {}
    if(search?.length!=0){
        query = {
            name: {
                $regex:search,
                $options: 'i'
            }
        }
    }
    const users = await User.find(query).select('_id name email');
    if(users){
        res.status(200).json({users})
    }else{
        res.status(400)
        throw new Error('User not found')
    }

    
})



//@desc    addUser
//route    POST /api/admin/add
//@access  Private/admin
const addUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;

    if(!(email && name && password)){
        res.status(400)
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

    const users = await User.find({}).select('_id name email');

    if(user && users){
        res.status(201).json({users})
    }else{
        res.status(400)
        throw new Error('Failed add new user')
    }
})


//@desc    editUser
//route    PUT /api/admin/edit/:id
//@access  Private/admin
const editUser = asyncHandler( async (req:Request,res:Response) => {
    const {id} = req.params

    const user = await User.findById(id)
    
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        try {
            const updatedUser = await user.save()
            const users = await User.find({}).select('_id name email');
            if(updatedUser && users){
                res.status(200).json({users})
            }
        } catch (error) {
            res.status(400)
            throw new Error('User already exits')
        }

    }else{
        res.status(400)
        throw new Error('User not found')
    }
})


//@desc    deleteUser
//route    DELETE /api/admin/delete/:id
//@access  Private/admin
const deleteUser = asyncHandler(async (req:Request,res:Response) => {
    const {id} = req.params

    const deletedUser =await User.findByIdAndDelete(id)
    const users = await User.find({}).select('_id name email');
    if(deletedUser){
        res.status(200).json({users})
    }else{
        res.status(400)
        throw new Error('User unable to delete')
    }
})


//@desc    adminLogout
//route    POST /api/admin/logout
//@access  Private/admin
const adminLogout = asyncHandler(async (req:Request,res:Response) => {

    res.cookie(
        'admin',
        '',
        {
            httpOnly:true,
            expires:new Date(0),
            sameSite:'strict'
        }
    )
    res.status(200).json({message:'Admin logged out'})
})



export {
    adminLogin,
    addUser,
    searchUser,
    getAllUsers,
    editUser,
    deleteUser,
    adminLogout
}