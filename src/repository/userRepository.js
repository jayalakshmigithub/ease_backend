import { userModel } from'../model/userModel.js';
import { workspaceModel } from '../model/workspaceModel.js';



const findEmail = async(email)=>{
const emailUser = await userModel.findOne({email:email})
return emailUser
}

const findGmail = async(email)=>{                                                                   
    console.log('gmailwroking')
    return await userModel.findOne({email})
}

const createUser =async(userData)=>{
    try {
        console.log('user data in repo',userData)
        const NewUser = new userModel({
            name:userData.name,
            email:userData.email,
            password:userData.password,
            confirmPassword:userData.confirmPassword
        }).save()
   console.log('saved',NewUser)
        return await NewUser

    } catch (error) {
        console.error(error)
    }   
   
    
}

const findUserById = async (_id) => {
    try {
        const user = await userModel.findById(_id);
        return user;
    } catch (error) {
        console.log("Error findUserById:", error);
        throw error;
    }
};

const findUserByEmail = async(email)=> {
    try {
        return await userModel.findOne({ email });
    } catch (error) {
        console.log("Error findUserByEmail:", error);
        throw error;
}
}

const createUserByGoogle =async(userData)=>{
    try {
        return new userModel({
            name: userData.name,
            email: userData.email,
            image : userData.image,
            isGoogle : true
        }).save()
    } catch (error) {
        console.log(error)
        throw error     
    }
}

const updateUser = async(userId,filteredUsers)=>{
    try {
        const currentUser = await userModel.findUserById(userId)
        if(!currentUser){
            return null
        }else{
            const updatedFields = {
                name:filteredUsers.name||currentUser.name,
                email:filteredUsers.email||currentUser.email

            }
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                updatedFields,
                {new:true}
            )
            console.log('updated user',currentUser)
            if(!updatedUser){
                console.log('error in updating the user')
                return null
            }
            return updatedUser
        }
    } catch (error) {
        console.error('error in updating the user', error);
        throw error 
    }

}


export {
    findEmail,
    findGmail,
    createUser,
    findUserById,
    findUserByEmail,
    createUserByGoogle,
    updateUser
    
}
