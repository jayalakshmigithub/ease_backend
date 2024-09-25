import express from 'express';
import { verifyToken } from '../utils/middleware/authMiddleware.js';
import {adminLogin, blockUserAccount, unblockUserAccount, usersList} from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin);
adminRouter.get('/getusers',verifyToken,usersList);
adminRouter.post('/blockuser',verifyToken,blockUserAccount)
adminRouter.post('/unblockuser',verifyToken,unblockUserAccount)
// adminRouter.post('/login',adminSignup)


export default adminRouter 