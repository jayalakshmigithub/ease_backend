import * as taskServices from '../services/taskServices.js'


const taskCreation = async(req,res)=>{
    try {
        const response = await taskServices.CreatTask(req.body)
        return res.status(200).json({response})
    } catch (error) {
        console.error('error in task creation contorller',error);
        return res.status(500).json({message:'internal seerver error'})
        
    }
}

const fetchProjectTasks = async(req,res)=>{
    try {
        const projectId = req.params.projectId;  
        const tasks = await taskServices.getProjectTasks(projectId);
        return res.status(200).json({ tasks });
    } catch (error) {
        console.error('error occured in fetchProjectTasks',error);
       return res.status(500).json({message:'internal server error'})   
    }
}

const updateTaskStatus = async (req, res) => {
    try {
      const { taskId, status } = req.body;  
      if (!taskId || !status) {
        return res.status(400).json({ message: 'Task ID and status are required' });
      }
      const updatedTask = await taskServices.updateTaskStatus(taskId, status);
      res.status(200).json({ message: 'Task status updated', task: updatedTask });
    } catch (error) {
      console.error('Error in updateTaskStatus controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//   const updateTaskStatus = async (req, res) => {
//     try {
//       const { taskId, status } = req.query;  // Get taskId and status from query params
  
//       // Call the service to update the task status
//       const updatedTask = await taskServices.updateTaskStatus(taskId, status);
  
//       // Respond with the updated task
//       res.status(200).json({ message: 'Task status updated', task: updatedTask });
//     } catch (error) {
//       console.error('Error in updateTaskStatus controller:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  




export{
    taskCreation,
    fetchProjectTasks,
    updateTaskStatus
}