import { userModel } from "../model/userModel.js";
import { workspaceModel } from "../model/workspaceModel.js";

const findEmail = async (email) => {
  const emailUser = await userModel.findOne({ email: email });
  return emailUser;
};

const findGmail = async (email) => {
  return await userModel.findOne({ email });
};
//OG
// const createUser =async(user)=>{
//     try {
//         console.log('user data in repo',user)
//         const NewUser = new userModel({
//             name:user.name,
//             email:user.email,
//             password:user.password,
//             confirmPassword:user.confirmPassword,
//             isInvited: user.isInvited || false,
//         }).save()
//    console.log('saved',NewUser)
//         return await NewUser

//     } catch (error) {
//         console.error(error)
//     }

// }

//cretae user updating for add workspace concept

// const createUser =async(user,workspaceId)=>{
//     try {
//         console.log('user data in repo',user)
//         console.log('Workspace ID:', workspaceId);
//         const NewUser = await new userModel({
//             name:user.name,
//             email:user.email,
//             password:user.password,
//             confirmPassword:user.confirmPassword,
//             isInvited: []
//         }).save()

//         console.log('New user saved:', NewUser);

//         if (workspaceId) {

//           const updatedUser = await userModel.findByIdAndUpdate(
//             NewUser._id,
//             { $addToSet: { isInvited: workspaceId } },
//             { new: true }
//           );

//           console.log('Updated user after adding workspaceId:', updatedUser);

//           await workspaceModel.findByIdAndUpdate(workspaceId, {
//             $addToSet: { members: NewUser._id }
//           });
//         }

//         return NewUser;

//     } catch (error) {
//         console.error(error)
//     }

// }

// const createUser = async (user, workspaceId) => {
//     console.log('User before calling createUser:', user);
// console.log('Workspace ID before calling createUser:', user.workspaceId);

//     try {
//         console.log('User data in repo:', user);
//         console.log('Workspace ID:', user.workspaceId);

//         console.log('User object before saving:', {
//             name: user.name,
//             email: user.email,
//             password: user.password,
//             confirmPassword: user.confirmPassword,
//             workspaceId : user.workspaceId,
//             isInvited: []
//         });

//         const NewUser = await new userModel({
//             name: user.name,
//             email: user.email,
//             password: user.password,
//             confirmPassword: user.confirmPassword,
//             workspaceId : user.workspaceId,
//             isInvited: []
//         }).save().catch(error => {
//             console.error('Error saving new user:', error);
//             throw error;
//         });

//         console.log('New user saved:', NewUser);

//         if (user.workspaceId) {
//             const updatedUser = await userModel.findByIdAndUpdate(
//                 NewUser._id,
//                 { $addToSet: { isInvited: workspaceId } },
//                 { new: true }
//             );

//             console.log('Updated user after adding workspaceId:', updatedUser);

//             const freshUser = await userModel.findById(NewUser._id);
//             console.log('Fresh user from database after update:', freshUser);

//             await workspaceModel.findByIdAndUpdate(workspaceId, {
//                 $addToSet: { members: NewUser._id }
//             });
//         }

//         return NewUser;

//     } catch (error) {
//         console.error('Error in createUser:', error);
//     }
// };

const createUser = async (userData) => {
    const { name, email, password, workspaceId } = userData;
    try {
      const newUser = await new userModel({
        name,
        email,
        password,
        sharedWorkspaces: workspaceId ? [workspaceId] : []
      }).save();
      if (workspaceId) {
        const workspace = await workspaceModel.findById(workspaceId);
        if (workspace) {
          if (!workspace.members || !workspace.members.some(memberId => memberId.equals(newUser._id))) {
            workspace.members.push(newUser._id);
            await workspace.save();
          } else {
            console.log("User is already a member of the workspace.");
          }
        }
      }
  
      return newUser;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  };
  
  

const findUserById = async (_id) => {
  try {
    const user = await userModel.findById(_id);
    return user;
  } catch (error) {
    console.log("Error findUserById:", error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    console.log("Error findUserByEmail:", error);
    throw error;
  }
};

const createUserByGoogle = async (userData) => {
  try {
    return new userModel({
      name: userData.name,
      email: userData.email,
      image: userData.image,
      isGoogle: true,
    }).save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (userId, filteredUsers) => {
  try {
    const currentUser = await userModel.findById({ _id: userId });
    if (!currentUser) {
      return null;
    } else {
      const updatedFields = {
        name: filteredUsers.name || currentUser.name,
        email: filteredUsers.email || currentUser.email,
      };
      const updatedUser = await userModel.findByIdAndUpdate(
        { _id: userId },
        updatedFields,
        { new: true }
      );
      if (!updatedUser) {
        console.log("error in updating the user");
        return null;
      }
      return updatedUser;
    }
  } catch (error) {
    console.error("error in updating the user", error);
    throw error;
  }
};



const updatePassword = async(email,securePassword)=>{
  try{
    return await userModel.findOneAndUpdate({email:email},{$set:{password:securePassword}},{new:true})
  }catch (error) {
    console.error("error in updating the password", error);
    throw error;
  }
}


const changePassword = async(userId,securePassword)=>{
  try{
    return await userModel.findByIdAndUpdate({_id:userId},{$set:{password:securePassword}},{new:true})
  }catch (error) {
    console.error("error in updating the change password", error);
    throw error;
  }
}

export {
  findEmail,
  findGmail,
  createUser,
  findUserById,
  findUserByEmail,
  createUserByGoogle,
  updateUser,
  updatePassword,
  changePassword
 
};
