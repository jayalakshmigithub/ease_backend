import * as userRepository from "../repository/userRepository.js";


const getByEmail = async(email)=>{
    try {
        const user = await userRepository.findEmail(email);
        return user
    } catch (error) {
        console.error(error)
    }

}


const getUserById = async(_id)=>{
    try{
        const userss = await userRepository.findUserById(_id)
        return userss
    }catch(error){
        console.log("Error getUserById:",error);
        throw error
    }
}

const getCreateUser = async(userData)=>{
    try {
        const user = await userRepository.createUser(userData);
        console.log('in get create user',userData)
        return user
        
    } catch (error) {
        console.error(error)
    }

}

const getUserByEmail = async(email)=>{
    try{
        return await userRepository.findUserByEmail(email)
    }catch(error){
        console.log("Error getByEmail:",error);
        throw error
}    
}

const getCreateUserByGoogle = async(userData)=>{
    try {
        return await userRepository.createUserByGoogle(userData)
    } catch (error) {
        console.log('errorr',error)
        throw error
        
    }
}

const getUpdatedUser = async(userId,filteredUsers)=>{
    try {
        return await userRepository.updateUser(userId,filteredUsers)
    } catch (error) {
        console.log('error in getUpdatedUser', error)
        throw error
        
    }
}



export  {
    getCreateUser,
    getByEmail,
    getUserById,
    getUserByEmail,
    getCreateUserByGoogle,
    getUpdatedUser
}