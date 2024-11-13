import * as projectServices from '../services/projectServices.js'



const projectCreation = async(req,res)=>{
    try {
        const response = await projectServices.getProject(req.body)
        return res.status(200).json({response})
    } catch (error) {
        console.log(error,'in project controller')
        return res.status(500).json({message:"internal server error"})
        
    }
}


const getProjectsInWorkspace = async(req,res)=>{
    const {workspaceId} = req.params;
    try {
       const projects = await projectServices.fetchProjectsByWorkspace(workspaceId)
       return res.status(200).json({projects})

    } catch (error) {
        console.error('error in getProjectsInWorkspace',error);
        return res.status(500).json({message:'internal server error'})
        
        
    }
}

//getting members in project

// const getProjectsWithMembers = async (req, res) => {
//     const { workspaceId } = req.params;

//     if (!workspaceId) {
//         return res.status(400).json({ message: "Workspace ID is required in the URL parameters" });
//     }

//     try {
       
//         const projects = await projectServices.fetchProjectsByWorkspaceWithMembers(workspaceId);
//         console.log('projects in getProjectsWithMembers',projects)
//         res.status(200).json({ projects });
//     } catch (error) {
//         console.error("Error in getProjectsWithMembers controller:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// new for getting project members
const getProjectMembers = async (req, res) => {
    const projectId = req.params.id;
    try {
        const memberEmails = await projectServices.getProjectMembersEmails(projectId);
        if (!memberEmails.length) {
            return res.status(404).json({ message: 'No members found for this project' });
        }
        res.status(200).json(memberEmails);
    } catch (error) {
        console.error('Error in getProjectMembers:', error);
        if (error.message === 'Project not found') {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};




const getEachProject = async(req,res)=>{
    try {
        const {id : projectId} = req.params
        const projectOverview = await projectServices.listEachProject(projectId)
        if(!projectOverview){
            return res.status(404).json({message:'project not found'})
        }
        return res.status(200).json({ project: projectOverview })
    } catch (error) {
        console.error('Internal server error:', error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

export{
    projectCreation,
    getProjectsInWorkspace,
    getEachProject,
    // getProjectsWithMembers
    getProjectMembers

}