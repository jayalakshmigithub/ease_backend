import {ChatRoom} from '../model/chatRoom.js'
import { projectModel } from '../model/projectModel.js';


// const createChatRoom = async (workspaceId, projectId, members) => {
//     try {
//         const existingChatRoom = await ChatRoom.findOne({ workspaceId, projectId });
//         if (existingChatRoom) {
//             return existingChatRoom;
//         }
//         const project = await projectModel.findById(projectId)
//         console.log('project',project)

//         const newChatRoom = new ChatRoom({
//             workspaceId,
//             projectId,
//             members,
//         });
//         await newChatRoom.save();
//         return newChatRoom;
//     } catch (error) {
//         console.error("Error creating chat room:", error);
//         throw error;
//     }
// };
const existingChatRoom = async (workspaceId, projectId) => {
    try {
        const existingChatRoom = await ChatRoom.findOne({ workspaceId, projectId });
        // if (existingChatRoom) {
        //     console.log(existingChatRoom,'esists')
        //     return existingChatRoom;
        // }
        // const project = await projectModel.findById({
        //     _id:projectId})
        // console.log('projectzzzz',project)
       

        // const newChatRoom = new ChatRoom({
        //     workspaceId,
        //     projectId,
            
        // });
        // await newChatRoom.save();
        return existingChatRoom;
    } catch (error) {
        console.error("Error creating chat room:", error);
        throw error;
    }
};


const createChatRoom = async(workspaceId, projectId)=>{
    try {
        const existingChatRoom = await ChatRoom.findOne({ workspaceId, projectId });
        if (existingChatRoom) {
            return existingChatRoom;
        }
        const project = await projectModel.findById({
            _id:projectId})

        if (!project || !project.members || project.members.length === 0) {
            throw new Error('No members found for this project');
        }
        const newChatRoom = new ChatRoom({
            workspaceId,
            projectId,
            members: project.members 
        });

        // const newChatRoom = new ChatRoom({
        //     workspaceId,
        //     projectId,
            
        // });

        await newChatRoom.save();
        return newChatRoom;
    } catch (error) {
        console.error("Error creating chat room:", error);
        throw error;
}

}

export {
    createChatRoom,
    existingChatRoom

     
}