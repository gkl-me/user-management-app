import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { NextFunction, Request, Response } from 'express'
import { throwDeprecation } from 'process'

export interface AuthenticatedRequest extends Request {
    user?:any;
} 


const userAuth = asyncHandler( async(req:AuthenticatedRequest,res:Response,next:NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if(token) {

            const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {id :string}
            if(decoded){
                const userfound = await User.findById(decoded.id).select('-password')
                if(userfound === null){
                    res.status(401)
                    throw new Error('User not found')
                    return;
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

export {
    userAuth
}