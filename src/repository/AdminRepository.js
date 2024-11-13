import { adminModel } from "../model/adminModel.js";
import { projectModel } from "../model/projectModel.js";
import { userModel } from "../model/userModel.js";
import { workspaceModel } from "../model/workspaceModel.js";



       
const findAdminByEmail = async(email)=>{
    try {
        const adminEmail = await adminModel.findOne({email})
        return adminEmail
        
    } catch (error) {
        console.log('error in findAdminByemail',error)
        throw error
        
    }
}

const findAdminById = async(_id)=>{
    try {
        const admin = await adminModel.findById(_id)
        return admin
    } catch (error) {
        console.log("Error findAdminById:", error);
        throw error;
        
    }
}

const findAllUsers = async()=>{
    try {
        const userslist = await userModel.find()
        return userslist
    } catch (error) {
        console.error('error happened in findallusers',error)
        throw error
        
    }
}




const blockUser = async(_id)=>{
    try {
        const blockedUser = await userModel.findByIdAndUpdate(
            _id,
            {isBlocked:true},
            {new:true}
        )
        if (!blockedUser) {
            throw new Error("User not found");
          }
          return blockedUser;
        
    } catch (error) {
        console.error("error occured in blockUsers ",error)
        throw error
        
    }

}

const unblockUser = async(_id)=>{
    try {
        const unblockedUser = await userModel.findByIdAndUpdate(
            _id,
            {isBlocked:false},
            {new:true}
        )
        if (!unblockedUser) {
            throw new Error("User not found");
          }
          return unblockedUser;
        
    } catch (error) {
        console.error("error occured in unblockUsers ",error)
        throw error
        
    }
}


const findAllWorkspacesAdmin = async()=>{
    try {
        const workspaceList =  workspaceModel.find().populate('OwnerId', 'name');
        return workspaceList
    } catch (error) {
        console.error('error in workspace lisitng repository',error);
        throw error
        
        
    }
}
const findWorkspaceById = async(workspaceId)=>{
    try {
        const workspaceById = await workspaceModel.findById(workspaceId)
        return workspaceById
    } catch (error) {
        console.error('error in workspace lisitng repository',error);
        throw error
        
    }
}

const findAllProjects = async()=>{
    try {
        const projectList = projectModel.find()
        return projectList
    } catch (error) {
        console.error('error in workspace lisitng repository',error);
        throw error
        
    }
}


// const findAllProjects = async () => {
//     try {

//         const projectList = await projectModel.find();

        
//         for (const project of projectList) {
//             const workspaceId = project.workspaceId;
//             project.workspaceDetails = await workspaceModel.findById(workspaceId);
//         }

//         return projectList;
//     } catch (error) {
//         console.error('Error in workspace listing repository', error);
//         throw error;
//     }
// };




export {
    findAdminByEmail,
    findAdminById,
    findAllUsers,
    blockUser,
    unblockUser,
    findAllWorkspacesAdmin,
    findAllProjects,
    findWorkspaceById

}