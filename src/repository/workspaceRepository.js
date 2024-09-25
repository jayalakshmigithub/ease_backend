// import { workspaceModel } from "../model/workspaceModel.js"


// const createWorkspace = async(workspaceData)=>{
//     try {
//         // console.log('in repoooo')
//         // console.log('wrk',workspaceData)
//         const newWorkspace = new workspaceModel({
//            name: workspaceData.name,
//            description:workspaceData.description,
//            OwnerId:workspaceData.OwnerId
//         })
//         await newWorkspace.save()
//         // console.log('Workspace saved', newWorkspace);
//         return newWorkspace
        
//     } catch (error) {
//         console.error('Error in repository:', error);
//         throw error;
        
//     }
// }
// const getWorkspace = async(ownerId)=>{
//     try {
//         const works= await workspaceModel.find({ OwnerId:ownerId});
//         console.log(works,'we9')
//         return works
//     } catch (error) {
//         console.log("Error findUserByEmail:", error);
//         throw error;
// }
// }

// export {
//     createWorkspace,
//     getWorkspace
// }

// const createWorkspace = async(workspaceData)=>{
//     try {
//         // console.log('in repoooo')
//         // console.log('wrk',workspaceData)
//         const newWorkspace = new workspaceModel({
//            name: workspaceData.name,
//            description:workspaceData.description,
//            OwnerId:workspaceData.OwnerId
//         })
//         await newWorkspace.save()
//         // console.log('Workspace saved', newWorkspace);
//         return newWorkspace
        
//     } catch (error) {
//         console.error('Error in repository:', error);
//         throw error;
        
//     }
// }

import { workspaceModel } from "../model/workspaceModel.js"
import { userModel } from "../model/userModel.js";


const workspaceById =async(workspaceId)=>{
    try{
        const workspacce = await workspaceModel.findById({_id:workspaceId})
        return workspacce
    }catch(error){
        console.log("Error at workspaceById:",error)
    }
}


const createWorkspace = async (workspaceData) => {
    try {
        
        console.log('OwnerId:', workspaceData.OwnerId);

      
        const newWorkspace = new workspaceModel({
            name: workspaceData.name,
            description: workspaceData.description,
            OwnerId: workspaceData.OwnerId
        });

       
        await newWorkspace.save();
        console.log('New workspace created:', newWorkspace);

        const user = await userModel.findById(workspaceData.OwnerId);

        console.log('Found user:', user);

        if (user) {
          
            if (!user.workspace) {
                user.workspace = [];
            }

           
            user.workspace.push(newWorkspace);
            console.log('Updated user with new workspace:', user.workspace);

            
            await user.save();
            console.log('User saved with new workspace.');
        } else {
            throw new Error('User not found');
        }

        return newWorkspace;

    } catch (error) {
        console.error('Error in repository:', error);
        throw error;
    }
};


const findWorkspaceByOwner = async(ownerId)=>{
    try {
        const works= await workspaceModel.find({ OwnerId:ownerId});
        console.log(works,'workspaces')
        return works
    } catch (error) {
        console.log("Error findUserByEmail:", error);
        throw error;
}
}

const findAllWorkspaces = async(userId)=>{
    try {
        const allWorkspaces = await workspaceModel.find({OwnerId:userId})
        return allWorkspaces
    } catch (error) {
        console.error(error)
        
    }
}

const insertToWorkspace = async(info)=>{
try {
    
        const workspace = await workspaceModel.findById(info.workspaceId)
        
        const membersEmail = workspace?.members.map(member=>member.email)
    
        const updatedInfo = info.updateMembers.filter(members=>{
            return !membersEmail?.includes(members.email)
        })
        updatedInfo.forEach(member => member.workspaceId = workspace?._id.toString());
    
         await workspaceModel.updateOne(
            {_id:info.workspace},
            {$push:{members:{$each:updatedInfo}}}
         )
         return updatedInfo
} catch (error) {
    console.error(error);
    throw new Error("Failed to update workspace members.");
    
}
}

const findWorkspaceById = async(userId, email)=>{
    try {
console.log('in findWorkspaceById')
        const workspaceById = workspaceModel.aggregate([
           { $facet:{
             ownedWorkspace:[
                {$match:{
                    ownerId:userId

                }}
             ],
             SharedWorkspaces:[
                {
                    $match:{
                        members:{
                            $elemMatch :{
                                email:email
                            }
                        }
                    }
                },
                
                    {
                        $lookup: {
                          from: "user",
                          let: { OwnerId: "$OwnerId" },
                          pipeline: [
                            {
                              $match: {
                                $expr: {
                                  $eq: [ "$_id", { $toObjectId: "$$OwnerId" } ]
                                }
                              }
                            },
                            {
                              $project: {
                                _id: 1,
                                name: 1,
                                email: 1
                              }
                            }
                          ],
                          as: "OwnerDetails"
                        }
                      }
                
             ]
             

            }}
        ]) 
        return workspaceById[0];
        
    } catch (error) {
        console.log("its the error from fetching My workspaces by Id shared and owned ",error);
      throw {msg:"Workspace not found"}
        
    }
}



const FetchWorkspace = async(workspaceId)=>{
    try {
        const EachWorkspace = await workspaceModel.findById(workspaceId)
        console.log(EachWorkspace,'in fetchworkspace')
        return EachWorkspace
    } catch (error) {
        console.log('error',error)
        throw error 
        
    }
}

export {
    createWorkspace,
    findWorkspaceByOwner,
    FetchWorkspace,
    findAllWorkspaces,
    findWorkspaceById,
    insertToWorkspace,
    workspaceById
}








//new in 11/24

// const getWorkspacesByOwner = async (ownerId) => {
//     try {
//         return await workspaceModel.find({ OwnerId: ownerId, isDisable: false }).exec();
//     } catch (error) {
//         throw new Error('Error fetching workspaces by owner: ' + error.message);
//     }
// };

// //new in 11/24
// const getWorkspacesByMember = async (userId) => {
//     try {
//         return await workspaceModel.find({ members: userId, isDisable: false }).exec();
//     } catch (error) {
//         throw new Error('Error fetching workspaces by member: ' + error.message);
//     }
// };

// //new in 11/24
// const getInvitedWorkspaces = async (userId) => {
//     try {
//         return await workspaceModel.find({ members: userId, isInvited: true, isDisable: false }).exec();
//     } catch (error) {
//         throw new Error('Error fetching invited workspaces: ' + error.message);
//     }
// };