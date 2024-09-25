


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



const getWorkspaceById= async(workspaceId)=>{
    try {
      
        const workspace = await workspaceRepository.workspaceById(workspaceId)

        return workspace
    } catch (error) {
        console.error("Error at getWorkspaceById:",error)   
    }
}

const getWorkspace = async(workspaceData)=>{
    try {
      
        const workspace = await workspaceRepository.createWorkspace(workspaceData)

        return workspace
    } catch (error) {
        console.error(error)

        
    }
}

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

export {
    getWorkspaceById,
    getWorkspace,
    listWorkspaceByOwner,
    listEachWorkspace,
    addMembersToWorkspace,
    listWorkspaceByMember,
    listAllWorkspaces
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