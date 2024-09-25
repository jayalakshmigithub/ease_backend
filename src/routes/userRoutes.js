import express from 'express'
import {signup,otpgenerate,otpVerify, signin,signinByGoogle, updateUserProfile} from '../controllers/userController.js'
import {verifyToken} from '../utils/middleware/authMiddleware.js'
import { createWorkspace,getEachWorkspace,getWorkspaces ,inviteUserToWorkspace} from '../controllers/workspaceController.js'
import { sendInvitationController, verifyInvitationController } from '../controllers/inviteController.js';
import { projectCreation } from '../controllers/projectController.js';




const userRoutes = express.Router()

userRoutes.post('/signup',signup)
userRoutes.post('/signin',signin)

userRoutes.post('/otpgenerate',otpgenerate)
userRoutes.post('/otpverify',otpVerify)
userRoutes.post('/signingoogle',signinByGoogle)
userRoutes.post('/create',verifyToken,createWorkspace)
userRoutes.post('/invite', verifyToken,sendInvitationController);
userRoutes.get('/verify', verifyInvitationController);
// userRoutes.get('/getworks', verifyToken,gettworkkks);
userRoutes.get('/workspace',verifyToken,getWorkspaces)
userRoutes.get('/workspace/:id',verifyToken,getEachWorkspace)
userRoutes.post('/createproject',verifyToken,projectCreation)
userRoutes.post('/invite', verifyToken,inviteUserToWorkspace);
userRoutes.put('/updateprofile/:id',verifyToken,updateUserProfile)





export default userRoutes  