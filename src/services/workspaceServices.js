


// import * as workspaceRepository from '../repository/workspaceRepository.js';

// const getWorkspace = async(workspaceData)=>{
//     try {
      
//         const workspace = await workspaceRepository.createWorkspace(workspaceData)

//         return workspace
//     } catch (error) {
//         console.error(error)
        
//     }
// }

// const getWorkssss = async(ownerId)=>{
//     try {
//         return await userRepository.getWorks(ownerId)
//     } catch (error) {
//         console.log('errorr getWorkssss',error)
//         throw error
        
//     }
// }

// export {
//     getWorkspace
// }








// import * as workspaceRepository from '../repository/workspaceRepository.js';

// const getWorkspace = async(workspaceData)=>{
//     try {
      
//         const workspace = await workspaceRepository.createWorkspace(workspaceData)

//         return workspace
//     } catch (error) {
//         console.error(error)

        
//     }
// }

// const listWorkspaceByOwner = async(ownerId)=>{
//     try {
//         return await workspaceRepository.findWorkspaceByOwner(ownerId)
//     } catch (error) {
//         console.log('errorr getWorkssss',error)
//         throw error
        
//     }
// }



// const listEachWorkspace = async(workspaceId)=>{
//     try {
//         return await workspaceRepository.FetchWorkspace(workspaceId)
        
//     } catch (error) {
//         console.log('error fetching workspce', error )
//         throw error 
        
//     }
// }

// export {
//     getWorkspace,
//     listWorkspaceByOwner,
//     listEachWorkspace,
//     listWorkspaceByMember,
//     listInvitedWorkspaces
// }



// //new in 11
// const listWorkspaceByMember = async (userId) => {
//     try {
//         return await workspaceRepository.getWorkspacesByMember(userId);
//     } catch (error) {
//         throw new Error('Service error: ' + error.message);
//     }
// };

// //new in 11
// const listInvitedWorkspaces = async (userId) => {
//     try {
//         return await workspaceRepository.getInvitedWorkspaces(userId);
//     } catch (error) {
//         throw new Error('Service error: ' + error.message);
//     }
// };

















import * as workspaceRepository from '../repository/workspaceRepository.js';






const getWorkspace = async(workspaceData)=>{
    try {
      
        const workspace = await workspaceRepository.createWorkspace(workspaceData)

        return workspace
    } catch (error) {
        console.error(error)

        
    }
}

// const getSharedWorkspaces = async (userId) => {
//     try {
//         const user = await userModel.findById(userId).populate('sharedWorkspaces');
//         console.log('shared wrokspace in service',user.sharedWorkspaces)
//         return user.sharedWorkspaces; 
//     } catch (error) {
//         console.error('Error fetching shared workspaces:', error);
//         throw error;
//     }
// };

const findMembersByWorkspaceId = async (workspaceId) => {
    try {
        const workspace = await workspaceRepository.findworkspaceById(workspaceId);
        
       
        const memberEmails = workspace ? workspace.members.map(member => member.userId.email) : [];
        
        return memberEmails;
    } catch (error) {
        console.error("Error at findMembersByWorkspaceId:", error);
        throw error;
    }
};


const getSharedWorkspaces = async (userId) => {
    try {
       
        const sharedWorkspaces = await workspaceRepository.findSharedWorkspace(userId);
        return sharedWorkspaces; 
    } catch (error) {
        console.error('Error fetching shared workspaces:', error);
        throw error; 
    }
};


const listWorkspaceByOwner = async(ownerId)=>{
    try {
        return await workspaceRepository.findWorkspaceByOwner(ownerId)
    } catch (error) {
        console.log('errorr getWorkssss',error)
        throw error
        
    }
}


const addMembersToWorkspace = async(workspaceDetails)=>{
    try {

        const updatedMembers = await workspaceRepository.insertToWorkspace(workspaceDetails)
        return updatedMembers
        
    } catch (error) {
        console.error('error inserting members to workspace ',error);
        throw error 
        
        
    }
}
const listWorkspaceByMember = async (userId,email) => {
        try {
            const workspaceByMember= await workspaceRepository.findWorkspaceById(userId,email);
            return workspaceByMember
        } catch (error) {
            console.error('Error finding workspaces by user ID or email:', error);
            throw error
        }
    };

const listAllWorkspaces = async(userId)=>{
    try {
        return await workspaceRepository.findAllWorkspaces(userId)
    } catch (error) {
        console.error('Error fetching all workspaces:', error);
        throw error;
        
    }

}


const listEachWorkspace = async(workspaceId)=>{
    try {
        return await workspaceRepository.FetchWorkspace(workspaceId)
        
    } catch (error) {
        console.log('error fetching workspce', error )
        throw error 
        
    }
}


// const changePasswordController = async (req, res) => {
//     const { email, currentPassword, newPassword } = req.body;
  
//     try {
    
//       const updatedUser = await userService.changePassword( currentPassword, newPassword);
  
//       return res.status(200).json({
//         message: 'Password successfully changed',
//         user: updatedUser,
//       });
//     } catch (err) {
   
//       return res.status(400).json({
//         error: err.message,
//       });
//     }
//   };

const deleteWorkspace = async (workspaceId) => {
    const deletedWorkspace = await workspaceRepository.deleteWorkspaceById(workspaceId);
    if (!deletedWorkspace) {
      throw new Error('Workspace not found');
    }
    return deletedWorkspace;
  };

export {
    
    getWorkspace,
    listWorkspaceByOwner,
    getSharedWorkspaces,
    listEachWorkspace,
    addMembersToWorkspace,
    listWorkspaceByMember,
    listAllWorkspaces,
    findMembersByWorkspaceId,
    deleteWorkspace
    // changePasswordController
    // listWorkspaceByMember,
    // listInvitedWorkspaces
}



// //new in 11
// const listWorkspaceByMember = async (userId) => {
//     try {
//         return await workspaceRepository.getWorkspacesByMember(userId);
//     } catch (error) {
//         throw new Error('Service error: ' + error.message);
//     }
// };

// //new in 11
// const listInvitedWorkspaces = async (userId) => {
//     try {
//         return await workspaceRepository.getInvitedWorkspaces(userId);
//     } catch (error) {
//         throw new Error('Service error: ' + error.message);
//     }
// };