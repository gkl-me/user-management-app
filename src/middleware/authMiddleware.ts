import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { NextFunction, Request, Response } from 'express'
import { throwDeprecation } from 'process'

export interface AuthenticatedRequest extends Request {
    user?:any;
} 


const protect = asyncHandler( async(req:AuthenticatedRequest,res:Response,next:NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if(token) {

        try {

            const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {id :string}
            req.user = await User.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized ,invalid token')

        }

    }else {
        res.status(401)
        throw new Error('Not authorized ,no token')
    }

})

export {
    protect
}