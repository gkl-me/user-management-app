import { Response } from 'express';
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';

const generateToken = (res:Response,id:Types.ObjectId) => {
    const token = jwt.sign({id},process.env.JWT_SECRET!,{
        expiresIn:'3d'
    })
    
    res.cookie(
        'jwt',
        token,
        {
            httpOnly:true,
            sameSite:'strict',
            secure:process.env.NODE_ENV !== ' development',
            maxAge: 3 * 24 *60 * 60 *1000
        }
    )
}

export default generateToken;