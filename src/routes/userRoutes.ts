import express from 'express'
import { authUser, getUserProfile, logout, registerUser , updateUserProfile } from '../controller/userController'
import { userAuth } from '../middleware/authMiddleware'
import { uploadImage } from '../middleware/multer'

const router = express.Router()

router.post('/',registerUser)
router.post('/login',authUser)
router.post('/logout',logout)
router.get('/profile',userAuth,getUserProfile)
router.put('/profile',userAuth,uploadImage,updateUserProfile)


export default router