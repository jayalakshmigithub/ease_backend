import * as chatRoomServices from '../services/chatRoomServices.js'

const existingChatRoomController = async (req, res) => {
    const { selectedWorkspace, selectedProject,  } = req.body;
    try {
        const chatRoom = await chatRoomServices.existingChatRoom(selectedWorkspace, selectedProject);
        console.log('chatrrom',chatRoom)
        return res.status(201).json({ chatRoom });
    } catch (error) {
        return res.status(500).json({ message: "Error existing chat room" });
    }
};

const createChatRoomController = async(req,res)=>{
    const {workspaceId,projectId} = req.body;
    
try {
    const chatRoom = await chatRoomServices.createChatRoom(workspaceId,projectId)
    return res.status(201).json({ chatRoom });
} catch (error) {
    return res.status(500).json({ message: "Error creating chat room" });
    
}

}

export {
    createChatRoomController ,
    existingChatRoomController
}