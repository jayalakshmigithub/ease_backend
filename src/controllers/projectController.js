import * as projectServices from '../services/projectServices.js'


const projectCreation = async(req,res)=>{
    try {
        console.log('grfh')
        const response = await projectServices.getProject(req.body)
        console.log('in project controller resposne:',response)
        return res.status(200).json({response})
    } catch (error) {
        console.log(error,'in project controller')
        return res.status(500).json({message:"internal server error"})
        
    }
}


export{
    projectCreation

}