import express from 'express'
import {signup,otpgenerate,otpVerify, signin,signinByGoogle, updateUserProfile,validateEmail,resetPassword,changePassword} from '../controllers/userController.js'
import {verifyToken} from '../utils/middleware/authMiddleware.js'
import { createWorkspace,getEachWorkspace,getWorkspaces ,inviteUserToWorkspace,sharedWorkspace,getAllMembersByWorkspaceId, deleteWorkspaceController} from '../controllers/workspaceController.js'
import { sendInvitationController, verifyInvitationController } from '../controllers/inviteController.js';
import { getProjectsInWorkspace, projectCreation ,getEachProject,getProjectMembers} from '../controllers/projectController.js';
import { fetchProjectTasks, taskCreation, updateTaskStatus } from '../controllers/taskController.js';
import { createChatRoomController, existingChatRoomController  } from '../controllers/chatRoomController.js';
// import { changePassword } from '../repository/userRepository.js';
// import { changePasswordController } from '../services/workspaceServices.js'

import { changePasswordController } from '../controllers/userController.js';
import { createMessageController , fetchMessagesController} from '../controllers/messageController.js';




const userRoutes = express.Router()

userRoutes.post('/signup',signup)
userRoutes.post('/signin',signin)

userRoutes.post('/otpgenerate',otpgenerate);
userRoutes.post('/verify-otp',otpVerify);
userRoutes.post('/signingoogle',signinByGoogle);
userRoutes.post('/create',verifyToken,createWorkspace);
userRoutes.post('/invite', verifyToken,sendInvitationController);
userRoutes.get('/verify', verifyInvitationController);
// userRoutes.get('/getworks', verifyToken,gettworkkks);
userRoutes.get('/workspaces',verifyToken,getWorkspaces);
userRoutes.get('/workspace/:id',verifyToken,getEachWorkspace);
// userRoutes.get('/project/:id',verifyToken.getEachProject)

userRoutes.post('/createproject',verifyToken,projectCreation);
userRoutes.get('/projects/:id',verifyToken,getEachProject)
userRoutes.get('/workspace/:id/members', verifyToken, getAllMembersByWorkspaceId);
userRoutes.get('/projects/:id/members',verifyToken,getProjectMembers)


userRoutes.post('/invite', verifyToken,inviteUserToWorkspace);
userRoutes.put('/updateprofile/:userId',verifyToken,updateUserProfile);
userRoutes.get('/workspaces/:workspaceId/projects',verifyToken,getProjectsInWorkspace);



userRoutes.post('/tasks',verifyToken, taskCreation)
userRoutes.get('/projects/:projectId/tasks',verifyToken,fetchProjectTasks)
userRoutes.put('/tasks/status',verifyToken,updateTaskStatus)


userRoutes.get('/chat',verifyToken,existingChatRoomController)
userRoutes.post('/chat',verifyToken,createChatRoomController)

userRoutes.get('/messages',verifyToken,fetchMessagesController)
userRoutes.post('/messages',verifyToken,createMessageController)

userRoutes.post('/changepassword',verifyToken,changePasswordController)

userRoutes.delete('/workspaces/:id',verifyToken,deleteWorkspaceController)

userRoutes.post('/verify-email',validateEmail)

userRoutes.post('/reset-password',resetPassword)

userRoutes.post('/change-password',verifyToken,changePassword)


export default userRoutes  