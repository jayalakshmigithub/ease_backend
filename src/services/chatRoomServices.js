import * as chatRoomRepository from '../repository/chatRoomRepository.js'

const existingChatRoom = async(workspaceId,projectId)=>{
   try {
     const chatroom = await chatRoomRepository.existingChatRoom(workspaceId,projectId)
     return chatroom
   } catch (error) {
    console.error('error occured in service',error);
    throw error 
   }
}

const createChatRoom = async(workspaceId,projectId)=>{
    try {
        const chatRoom = await chatRoomRepository.createChatRoom(workspaceId,projectId)
        return chatRoom
    } catch (error) {
        console.error('error occured in service',error);
        throw error
        
    }
}

export {
    createChatRoom,
    existingChatRoom
}