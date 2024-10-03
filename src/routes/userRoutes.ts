import express from 'express'
import { authUser, getUserProfile, logout, registerUser , updateUserProfile } from '../controller/userController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/',registerUser)
router.post('/login',authUser)
router.post('/logout',logout)
router.get('/profile',protect,getUserProfile)
router.put('/profile',protect,updateUserProfile)


export default router