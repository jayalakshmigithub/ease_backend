import { adminModel } from "../model/adminModel.js";
import { userModel } from "../model/userModel.js";



       
const findAdminByEmail = async(email)=>{
    try {
        const adminEmail = await adminModel.findOne({email})
        return adminEmail
        
    } catch (error) {
        console.log('error in findAdminByemail',error)
        throw error
        
    }
}

const findAdminById = async(_id)=>{
    try {
        const admin = await adminModel.findById(_id)
        console.log(admin,'adminnn')
        return admin
    } catch (error) {
        console.log("Error findAdminById:", error);
        throw error;
        
    }
}

const findAllUsers = async()=>{
    try {
        const userslist = await userModel.find()
        return userslist
    } catch (error) {
        console.error('error happened in findallusers',error)
        throw error
        
    }
}


const blockUser = async(_id)=>{
    try {
        const blockedUser = await userModel.findByIdAndUpdate(
            _id,
            {isBlocked:true},
            {new:true}
        )
        if (!blockedUser) {
            throw new Error("User not found");
          }
          console.log('User blocked in repository');
          return blockedUser;
        
    } catch (error) {
        console.error("error occured in blockUsers ",error)
        throw error
        
    }

}

const unblockUser = async(_id)=>{
    try {
        const unblockedUser = await userModel.findByIdAndUpdate(
            _id,
            {isBlocked:false},
            {new:true}
        )
        if (!unblockedUser) {
            throw new Error("User not found");
          }
          console.log('User unblocked in repository');
          return unblockedUser;
        
    } catch (error) {
        console.error("error occured in unblockUsers ",error)
        throw error
        
    }
}



export {
    findAdminByEmail,
    findAdminById,
    findAllUsers,
    blockUser,
    unblockUser

}