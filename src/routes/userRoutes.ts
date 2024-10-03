import express from 'express'
import { authUser, getUserProfile, logout, registerUser , updateUserProfile } from '../controller/userController'

const router = express.Router()

router.post('/',registerUser)
router.post('/login',authUser)
router.post('/logout',logout)
router.get('/profile',getUserProfile)
router.put('/profile',updateUserProfile)


export default router