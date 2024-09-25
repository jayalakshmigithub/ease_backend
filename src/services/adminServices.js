
import * as adminRepository from '../repository/AdminRepository.js';

const getAdminByEmail = async(email)=>{
 try {
    const getAdmin =  await adminRepository.findAdminByEmail(email)
    return getAdmin
 } catch (error) {
    console.log('error in getAdminByEmail',error)
    throw error
 }

}

const getAdminById = async(_id)=>{
    try {
        const getByid = await adminRepository.findAdminById(_id)
        return getByid
    } catch (error) {
        console.log('error getAdminById', error)
        throw error 
    }

}

const getAllUsers = async()=>{
    try {
        const getUsers = await adminRepository.findAllUsers()
        return getUsers
    } catch (error) {
        console.log('error occured in gettallusers',error)
        throw error
        
    }
}

const getBlockUsers = async(_id)=>{
    try {
        const getBlockedUsers = await adminRepository.blockUser(_id)
        return getBlockedUsers
    } catch (error) {
        console.log('error occured in getblockusers',error)
        throw error
    }
}

const getUnblockUser = async(_id)=>{
    try {
        const getUnblockedUser = await adminRepository.unblockUser(_id)
        return getUnblockedUser
    } catch (error) {
        console.log('error occured in getUnblockusers',error)
        throw error 
    }
}




export{
    getAdminByEmail,
    getAdminById,
    getAllUsers,
    getBlockUsers,
    getUnblockUser

}