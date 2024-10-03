import { NextFunction, Request, Response } from "express"

const notFound = async (req:Request,res:Response,next:NextFunction) => {
    const error = new Error('Not found')
    res.status(404)
    next(error)
}

const errorHandler = async (err:Error,req:Request,res:Response,next:NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV !== 'prodution'?err.stack : null
    })
}


export {
    notFound,
    errorHandler
}
