import {taskModel }from '../model/taskModel.js';
import { projectModel } from '../model/projectModel.js';
import mongoose from 'mongoose';


// const CreateTask = async(taskData)=>{
//     try {
//         const task = await taskModel.findById(taskData)
//         const newTask = new taskModel({
//             taskName: taskData.name,
//             Description: taskData.Description,
//             assignee: taskData.assignee,
//             // fromDate: taskData.fromDate,
//             // toDate: taskData.toDate,
//             priority: taskData.priority
            
//         })

//         const saveTask = await newTask.save()
//         console.log('task saved',saveTask)

//         // await projectModel.findByIdAndUpdate(
//         //     {_id:taskData.projectId},
//         //     {$push:{tasks:saveTask._id}}
//         // )
//         return 'task created successfully'
        
//     } catch (error) {
//         console.error('error in repo',error);
//         throw error    
//     }
// }


//OG
// const CreateTask = async (taskData) => {
//     try {
       
//         const newTask = new taskModel({
//             name: taskData.name,
//             Description: taskData.description,
//             assignee: taskData.assignee,
//             priority: taskData.priority,
//             projectId: taskData.projectId
//         });
//         const saveTask = await newTask.save();
//         console.log('Task saved', saveTask);

        
//         await projectModel.findByIdAndUpdate(
//             { _id: taskData.projectId },
//             { $push: { tasks: saveTask._id } }
//         );

//         return saveTask;
//     } catch (error) {
//         console.error('Error in repo', error);
//         throw error;
//     }
// };


// const getTasks = async (projectId) => {
//     try {
//         const tasks = await taskModel.aggregate([
            
            
//             {
              
//                 $match: { projectId: projectId } 
//             },
//             {
//                 $lookup: {
//                     from: "users", 
//                     localField: "assignee", 
//                     foreignField: "_id", 
//                     as: "assigneeDetails" 
//                 }
//             },
//             {
//                 $project: {
//                     name: 1,
//                     Description: 1,
//                     priority: 1,
//                     status: 1,
//                     assigneeDetails: { _id: 1, email: 1, } 
//                 }
//             }
//         ]);
//         console.log("`Tasks retrieved from database:`", tasks);

//         return tasks;
//     } catch (error) {
//         console.error("Error fetching project tasks with assignees:", error);
//         throw error;
//     }
// };
// const getTasks = async (projectId) => {
//     try {
//         const tasks = await taskModel
//             .find({ projectId })
//             .populate({
//                 path: 'assignee', 
//                 select: '_id email ', 
//             })
//             .select('name Description priority status assignee'); 

//         console.log("Tasks retrieved from database:", tasks);
//         return tasks;
//     } catch (error) {
//         console.error("Error fetching project tasks with assignees:", error);
//         throw error;
//     }
// };

// const getTasks = async () => {
//     try {
//         const tasks = await taskModel
//             .find()  
//             .populate({
//                 path: 'assignee', 
//                 select: '_id email', 
//             })
//             .select('name Description priority status assignee');  

//         console.log("Tasks retrieved from database:", tasks);
//         return tasks;
//     } catch (error) {
//         console.error("Error fetching tasks with assignees:", error);
//         throw error;
//     }
// };





const CreateTask = async (taskData) => {
    try {
       
        const assignees = taskData.assignee.map((user) => ({
            userId: new mongoose.Types.ObjectId(user._id),  
            email: user.email, 
        }));

        const newTask = new taskModel({
            name: taskData.name,
            Description: taskData.description,
            assignee: assignees,  
            priority: taskData.priority,
            projectId: taskData.projectId
        });

        const saveTask = await newTask.save();
        await projectModel.findByIdAndUpdate(
            { _id: taskData.projectId },
            { $push: { tasks: saveTask._id } }
        );

        return saveTask;
    } catch (error) {
        console.error('Error in repo', error);
        throw error;
    }
};

const getTasks = async (projectId) => {
    try {
        
        const tasks = await taskModel
            .find({ projectId })  
            .populate({
                path: 'assignee', 
                select: '_id email',  
            })
            .select('name Description priority status assignee');  
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks for project:", error);
        throw error;
    }
};

const updateTaskStatus = async (taskId, status) => {
    try {
     
      const updatedTask = await taskModel.findByIdAndUpdate(
        taskId,
        { status }, 
        { new: true }
      );
  
      if (!updatedTask) {
        throw new Error('Task not found');
      }
  
      return updatedTask;
    } catch (error) {
      console.error('Error in updating task status:', error);
      throw error;
    }
  };
  


export {
    CreateTask,
    getTasks,
    updateTaskStatus

}