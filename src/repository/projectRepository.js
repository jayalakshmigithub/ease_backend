import {projectModel} from '../model/projectModel.js'
import { workspaceModel } from '../model/workspaceModel.js'

// const createProject = async(projectData)=>{
//     try {

//         const response = await projectModel.create(projectData)
//         await workspaceModel.findByIdAndUpdate(
//             {_id:projectData.workspaceName},
//             {$push:{projects:response._id}}
//         );
//         return 'project created succesfully'
//     } catch (error) {
//         console.log('error in creating project',error)
//         throw error 
        
//     }
// }
const createProject =async(projectData)=>{
    try {
        const newProject = new projectModel({
            projectName: projectData.projectName,
            Description: projectData.Description,
            workspaceName:projectData.workspaceName,
            // masterId:projectData.masterId,
            fromDate:projectData.fromDate,
            toDate:projectData.toDate
        })
 

        const savedProject = await newProject.save()
        console.log('savedProject',savedProject)
       
        await workspaceModel.findByIdAndUpdate(
            {_id:projectData.workspaceName},
            {$push:{projects:savedProject._id}}
        )
        return 'project created successfully'
    } catch (error) {
        console.error('error in repo',error)
        throw error   
    }
}

export{
    createProject
}