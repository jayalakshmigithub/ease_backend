import * as projectRepository from '../repository/projectRepository.js'

const getProject = async(projectData)=>{
    try {
        const project = await projectRepository.createProject(projectData)
        console.log(project,'projectt')
        return project
        
    } catch (error) {
        console.error(error)
    }

}

export{
    getProject

}