import * as userRepository from "../repository/userRepository.js";
import { userModel } from "../model/userModel.js";
import bcrypt from 'bcryptjs';


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

// const getCreateUser = async(data)=>{
//     try {
//         const user = await userRepository.createUser(data);
//         console.log('in get create user',user)
//         return user
        
//     } catch (error) {
//         console.error(error)
//     }

// }


const getCreateUser = async(data)=>{
    try {
        const user = await userRepository.createUser(data);
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

const changePassword = async (email, currentPassword, newPassword) => {
    try {
   
      const user = await userModel.findOne({ email });
  
      if (!user) {
        throw new Error("User not found");
      }
  
    
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
      }
  
     
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      return user;
    } catch (err) {
      throw new Error(`Error changing password: ${err.message}`);
    }
  };


const getUpdatePassword = async(email,securePassword)=>{
    try{
        return await userRepository.updatePassword(email,securePassword)
    } catch (err) {
        throw new Error(`Error getUpdatePassword: ${err.message}`);
      }
}
const getChangePassword = async(userId,securePassword)=>{
    try{
        return await userRepository.updatePassword(userId,securePassword)
    } catch (err) {
        throw new Error(`Error getChangePassword: ${err.message}`);
      }
}

export  {
    getCreateUser,
    getByEmail,
    getUserById,
    getUserByEmail,
    getCreateUserByGoogle,
    getUpdatedUser,
    changePassword,
    getUpdatePassword,
    getChangePassword
}