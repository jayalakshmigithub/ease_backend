
import *  as userServices from "../services/userServices.js";
import { otpGenerate } from '../utils/otpgenerate.js';
import { generateTokens } from "../utils/jwt/generateToken.js";
import { comparePassword, hashPassword } from '../utils/functions/password.js'
import { workspaceModel } from "../model/workspaceModel.js";
import { getWorkspace } from "../services/workspaceServices.js";
import *  as workspaceServices from '../services/workspaceServices.js'

// const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const existUser = await userServices.getByEmail(email)
//         if (existUser) {
//             console.log(existUser, 'existuser')
//             return res.status(400).json({ message: 'user already exist' })
//         } else {
//             const securePassword = await hashPassword(password)
//             const userData = { name, email, password: securePassword }
//             const user = await userServices.getCreateUser(userData)
//             const userId = user._id.toString();
//             const { accessToken, refreshToken } = generateTokens(res, {
//                 userId
//             });

//             return res.status(200).json({ user, accessToken, refreshToken })
//         }
//     } catch (error) {
//         console.log("error happened", error.message)
//         return res.status(500).json({ message: 'internal server error ' })
//     }
// }


//OG monday 

// const signup = async (req, res) => {
//     try {
//         const { name, email, password ,workspaceId} = req.body;

        
//         console.log(workspaceId, 'workspaceid in signu')
//         const existUser = await userServices.getByEmail(email)
//         if (existUser) {
//             console.log(existUser, 'existuser')
//             return res.status(400).json({ message: 'user already exist' })
//         } else {
//             const securePassword = await hashPassword(password)
//             const userData = { name, email, password: securePassword }
//             const user = await userServices.getCreateUser(userData)

//         if(workspaceId){
//             user.workspace.push(workspaceId)
//             console.log('in signuppppppppp',workspaceId)
//             await user.save()

//             await workspaceModel.findByIdAndUpdate(workspaceId,{
//                 $push:{members:user._id}
//             })
//         }

//             const userId = user._id.toString();
//             const { accessToken, refreshToken } = generateTokens(res, {
//                 userId
//             });

//             return res.status(200).json({ user, accessToken, refreshToken })
//         }
//     } catch (error) {
//         console.log("error happened", error.message)
//         return res.status(500).json({ message: 'internal server error ' })
//     }
// }


//OG TUESDAY
// const signup = async (req, res) => {
//     try {
        
//         const { name, email, password,workspaceId } = req.body;
    
//         const existUser = await userServices.getByEmail(email)
//         if (existUser) {
//             console.log(existUser, 'existuser')
//             return res.status(400).json({ message: 'user already exist' })
//         } else {
//             const securePassword = await hashPassword(password)
//             const userData = { name, email, password: securePassword }
//             const user = await userServices.getCreateUser(userData)

            
//             const workspace = await workspaceModel.findOne({_id:workspaceId})
           

//         if(workspace){
//             user.workspace.push(workspace)
//             console.log('in signuppppppppp',workspace._id)
//             await user.save()

//             await workspaceModel.findByIdAndUpdate(workspace._id,{
//                 $push:{members:user._id}
//             })
//         }

//             const userId = user._id.toString();
//             const { accessToken, refreshToken } = generateTokens(res, {
//                 userId
//             });

//             return res.status(200).json({ user, accessToken, refreshToken })
//         }
//     } catch (error) {
//         console.log("error happened", error.message)
//         return res.status(500).json({ message: 'internal server error ' })
//     }
// }




// const signup = async (req, res) => {
//     try {
        
//         const { name, email, password,workspaceId,token } = req.body;
    
//         const existUser = await userServices.getByEmail(email)
//         if (existUser) {
//             console.log(existUser, 'existuser')
//             return res.status(400).json({ message: 'user already exist' })
//         } else {
//             const securePassword = await hashPassword(password)
//             const userData = { name, email, password: securePassword }


//             if(workspaceId&&token){
//                 userData.isInvited = true
//             }
//             const user = await userServices.getCreateUser(userData)

//             if(workspaceId&& token){

//                 const workspace = await workspaceModel.findOne({_id:workspaceId})

//                 if(workspace){
//                     user.workspace.push(workspace)
//                     console.log('Signup through invite, workspace:', workspace._id);
//                     await user.save()
        
//                     await workspaceModel.findByIdAndUpdate(workspace._id,{
//                         $push:{members:user._id}
//                     })
//                 }else{
//                     return res.status(400).json({message:'invalid workspace or token '})
//                 }

//             }
            
//             console.log('hii')
//             const userId = user._id.toString();
//             const { accessToken, refreshToken } = generateTokens(res, {
//                 userId
//             });

//             return res.status(200).json({ user, accessToken, refreshToken })
//         }
//     } catch (error) {
//         console.log("error happened", error.message)
//         return res.status(500).json({ message: 'internal server error ' })
//     }
// }


const signup = async (req, res) => {
        try {
            
            const { name, email, password,workspaceId } = req.body;
        
            const existUser = await userServices.getByEmail(email)
            if (existUser) {
                return res.status(400).json({ message: 'user already exist' })
            } else {
                const securePassword = await hashPassword(password)
                const userData = { name, email, password: securePassword }
                if(workspaceId){
                    const existWorkspace = await workspaceServices.getWorkspaceById(workspaceId)
           
                    if(existWorkspace){
                    // const existWorkspace = await workspaceServices.getWorkspaceById(workspaceId)
                    // i need to update the workspace to psuh to the shared workspace

                }
                }
                const user = await userServices.getCreateUser(userData)
    
                if(workspaceId){
    
                    const workspace = await workspaceModel.findOne({_id:workspaceId})
    
                    if(workspace){
                        user.workspace.push(workspace)
                        console.log('Signup through invite, workspace:', workspace._id);
                        await user.save()
            
                        await workspaceModel.findByIdAndUpdate(workspace._id,{
                            $push:{members:user._id}
                        })
                    }else{
                        return res.status(400).json({message:'invalid workspace or token '})
                    }
    
                }
                
                console.log('hii')
                const userId = user._id.toString();
                const { accessToken, refreshToken } = generateTokens(res, {
                    userId
                });
    
                return res.status(200).json({ user, accessToken, refreshToken })
            }
        } catch (error) {
            console.log("error happened", error.message)
            return res.status(500).json({ message: 'internal server error ' })
        }
    }

//og


// const otpgenerate = async (req, res) => {
//     try {
//         const { email } = req.body;
//         let otp = await otpGenerate(email);
//         console.log(otp, "otp");
//         res.cookie("otp", otp, { maxAge: 60000 });
//         return res
//             .status(200)
//             .json({ message: "OTP generated and sent successfully" });
//     } catch (error) {
//         console.log(error.message);
//         return res.status(400).json({ message: "internal server error" });
//     }
// };

// const otpVerify = (req, res) => {
//     const { otp } = req.body;
//     const cookieOtp = req.cookies.otp;

//     console.log('Received OTP:', otp);
//     console.log('Cookie OTP:', cookieOtp);

//     if (cookieOtp && cookieOtp === otp) {
//         res.clearCookie('otp');
//         return res.status(200).json({ message: 'OTP verified' });
//     } else {
//         return res.status(400).json({ message: 'Invalid OTP' });
//     }
// };





const otpgenerate = async (req, res) => {
    try {
        const { email } = req.body;
        let otp = await otpGenerate(email);
        console.log(otp, "otp");
        res.cookie("otp", otp, { maxAge: 60000 });
        return res
            .status(200)
            .json({ message: "OTP generated and sent successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "internal server error" });
    }
};

const otpVerify = (req, res) => {
    const { otp } = req.body;
    const cookieOtp = req.cookies.otp;

    console.log('Received OTP:', otp);
    console.log('Cookie OTP:', cookieOtp);

    if (cookieOtp && cookieOtp === otp) {
        res.clearCookie('otp');
        return res.status(200).json({ message: 'OTP verified' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await userServices.getUserByEmail(email);
        console.log('user in signin',user)
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (!user.password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        if (user.isBlocked) {
            return res.status(403).json({
                message: "User is blocked, please contact admin to restore access",
            });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const userId = user._id

        const { accessToken, refreshToken } = generateTokens(res, {
            userId
        });
        return res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const signinByGoogle = async (req, res) => {
    try {
        const { name, email, image } = req.body
        let imageUrl

        const data = { name, email, image: imageUrl, isGoogle: true }
        let user = await userServices.getByEmail(email)
        if (!user) {
            user = await userServices.getCreateUserByGoogle(data)
        }
        if (user?.isBlocked == true) {
            return res.status(401).json({ message: "User is Blocked" });
        }
        const userId = user._id.toString()
        const { accessToken, refreshToken } = generateTokens(res, {
            userId
        })
        return res.status(200).json({ user, accessToken, refreshToken })
    } catch (error) {

        console.error('error occured in google login', error);
        return res.status(500).json({ message: 'internal server error' })
    }
}

const updateUserProfile = async(req,res)=>{
    try {

        const {formData} = req.body
        console.log(req.body,'reqof')
        console.log(req.query,'qiery')

        console.log(formData,'formdata')
        const {name,email} = formData
        const userId =  req.params.userId;
        console.log('req.user._id',req.params.userId)
        console.log('Token user ID from verifyToken middleware:', req.user._id); // From token
        console.log('Request body:', formData);
        const existUser = await userServices.getUserById(userId)
        if(!existUser){
            return res.status(404).json({message:"user not found"})
        }

        const user ={
            name:name,
            email:email
        }

        // const updatedUser = await userServices.getUpdatedUser(
        //     userId,
        //     user
        // )
        const updatedUser = await userServices.getUpdatedUser(userId, {
            name: formData.name,
            email: formData.email,
          });
      
        return res.status(200).json({user:updatedUser})
    } catch (error) {
        console.error('error in updating user',error.message);
        return res.status(500).json({message:'internal server error'})
        
        
    }

}



export {
    signup,
    otpgenerate,
    otpVerify,
    signin,
    signinByGoogle,
    // gettworkkks,
    updateUserProfile
};


