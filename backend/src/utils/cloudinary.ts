import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


export const uploadCloudinary = async (path:string) =>{
    try {
        if(!path) return null
        const  res = await cloudinary.uploader.upload(path)
        //file uploaded
        return res
    } catch (error) {
        console.log(error)
        fs.unlinkSync(path)
        return null
    }

}

