import express from 'express'
import { adminLogin,addUser,searchUser,editUser,getAllUsers, deleteUser, adminLogout} from '../controller/adminController'
import { adminAuth } from '../middleware/authMiddleware'


const router = express.Router()

router.post('/login',adminLogin)
router.get('/users',adminAuth,getAllUsers)
router.get('/users/search',adminAuth,searchUser)
router.post('/add',adminAuth,addUser)
router.put('/edit/:id',adminAuth,editUser)
router.delete('/delete/:id',adminAuth,deleteUser)
router.post('/logout',adminAuth,adminLogout)


export default router