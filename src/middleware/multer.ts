import multer from "multer";
import fs from 'fs'
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'src/uploads/'
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir,{recursive:true})
        }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        const originalName = path.parse(file.originalname).name;  // Get the original name without extension
        const fileExtension = path.extname(file.originalname);  // Get the file extension
        cb(null, `${originalName}-${uniqueSuffix}${fileExtension}`);  // Save as "originalName-DateNow.extension"
    }
  })


  const fileFilter = (req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Invalid file type, Only JPEG, JPG and PNG files are allowed.'))
    }
  }

  const upload = multer({
    storage:storage,
    fileFilter:fileFilter
  })

  export const uploadImage = upload.single('image')