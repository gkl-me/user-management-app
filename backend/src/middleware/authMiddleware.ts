import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { NextFunction, Request, Response } from 'express'

export interface AuthenticatedRequest extends Request {
    user?:any;
    admin?:any
} 


const userAuth = asyncHandler( async(req:AuthenticatedRequest,res:Response,next:NextFunction) => {
    let token;

    token = req.cookies.user;

    if(token) {

            const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {id :string}
            if(decoded){
                const userfound = await User.findById(decoded.id).select('-password')
                if(userfound === null){
                    res.status(401)
                    throw new Error('User not found')
                }
                req.user = userfound
                next();
            }else{
                res.status(401)
                throw new Error('Not authorized ,invalid token')
            }

    }else {
        res.status(401)
        throw new Error('Not authorized ,no token')
    }

})


const adminAuth = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    let token;
    token = req.cookies.admin

    if(token){

        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {id:string}
        if(decoded.id==process.env.ADMIN_EMAIL){
            next()
        }else{
            res.status(401)
            throw new Error('Not authorized,Invalid token')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized,token not found')
    }
})

export {
    userAuth,adminAuth
}