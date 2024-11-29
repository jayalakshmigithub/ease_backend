import * as userServices from "../services/userServices.js";
import { otpGenerate } from "../utils/otpgenerate.js";
import { generateTokens } from "../utils/jwt/generateToken.js";
import { comparePassword, hashPassword } from "../utils/functions/password.js";
import { workspaceModel } from "../model/workspaceModel.js";
import { getWorkspace } from "../services/workspaceServices.js";
import * as workspaceServices from "../services/workspaceServices.js";
import { response } from "express";
  


const signup = async (req, res) => {
  try {
    const { name, email } = req.body;
    const existUser = await userServices.getByEmail(email);
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const securePassword = await hashPassword(password);
    const user = { name, email, password: securePassword };
    return res.status(200).json({ user });

   
  } catch (error) {
    console.log("Error happened", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
// const otpVerify = async (req, res) => {

//     const { userData,otp } = req.body;

//     if(!userData || !otp){
//         return res.status(400).json({message:"credential missing"})
//     }

//     const { name, email, password, } = userData;

//     const cookieOtp = req.cookies.otp;

//     console.log('Received OTP:', otp);
//     console.log('Cookie OTP:', cookieOtp);

//     if (cookieOtp && cookieOtp === otp) {
//         try {
//             const user = await userServices.getCreateUser({
//                 name,
//                 email,
//                 password,
//             });
//             console.log('User created:', user);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }

//             const userId = user._id.toString();
//             const { accessToken, refreshToken } = generateTokens(res, {
//                 userId,
//                 userRole: "user"
//             });

//             res.clearCookie('otp');
//             return res.status(200).json({ user, accessToken, refreshToken ,message:"registration success" });
//         } catch (error) {
//             console.error('Error creating user:', error);
//             return res.status(500).json({ message: 'Internal server error' });
//         }
//     } else {
//         return res.status(400).json({ message: 'Invalid OTP' });
//     }
// };

//OG 2/10/2024

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

const otpVerify = async (req, res) => {
  const { userData, otp, origin ,} = req.body;
  const email = req.body.userData;
  console.log('userData',userData)
  if (!userData || !otp) {
    return res.status(400).json({ message: "credential missing" });
  }

  const cookieOtp = req.cookies.otp;

  console.log("Received OTP:", otp);
  console.log("Cookie OTP:", cookieOtp);

  if (otp) {
    try {
      if (origin == "signup") {
        const securePassword = await hashPassword(userData.password);
        const data = {
          name: userData.name,
          email: userData.email,
          password: securePassword,
          workspaceId:userData.workspaceId
        };
        const user = await userServices.getCreateUser(data);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const userId = user._id.toString();
        const { accessToken, refreshToken } = generateTokens(res, {
          userId,
          userRole: "user",
        });
        res.clearCookie("otp");
        return res.status(200).json({
          user,
          accessToken,
          refreshToken,
          message: "registration success",
        });
      } else {
        const user = await userServices.getByEmail(email);
        res.clearCookie("otp");
        return res.status(200).json({
          user,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userServices.getUserByEmail(email);
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

    const userId = user._id;

    const { accessToken, refreshToken } = generateTokens(res, {
      userId,
    });
    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signinByGoogle = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    let imageUrl;

    const data = { name, email, image: imageUrl, isGoogle: true };
    let user = await userServices.getByEmail(email);
    if (!user) {
      user = await userServices.getCreateUserByGoogle(data);
    }
    if (user?.isBlocked == true) {
      return res.status(401).json({ message: "User is Blocked" });
    }
    const userId = user._id.toString();
    const { accessToken, refreshToken } = generateTokens(res, {
      userId,
    });
    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error("error occured in google login", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { formData } = req.body;
    const { name, email } = formData;
    console.log(req.params, "reqq");

    const userId = req.params.userId;
    const existUser = await userServices.getUserById(userId);
    if (!existUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const user = {
      name,
      email,
    };

    const updatedUser = await userServices.getUpdatedUser(userId, user);
    // const updatedUser = await userServices.getUpdatedUser(userId, {
    //     name: formData.name,
    //     email: formData.email,
    //   });

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("error in updating user", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

const changePasswordController = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const updatedUser = await userServices.changePassword(
      email,
      currentPassword,
      newPassword
    );

    return res.status(200).json({
      message: "Password successfully changed",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const existEmail = await userServices.getByEmail(email);
    if (!existEmail) {
      return res.status(404).json({ message: "Invalid email" });
    }
    return res.status(200).json({ existEmail });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const isUser = await userServices.getByEmail(email);
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const securePassword = await hashPassword(password);
    const user = await userServices.getUpdatePassword(email, securePassword);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, password, currentPassword } = req.body;
    const isUser = await userServices.getUserById(userId);
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(
      currentPassword,
      isUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Your current password is incorrect" });
    }
    const securePassword = await hashPassword(password);
    const user = await userServices.getUpdatePassword(userId, securePassword);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export {
  signup,
  otpgenerate,
  otpVerify,
  signin,
  signinByGoogle,
  validateEmail,
  resetPassword,
  changePassword,
  // gettworkkks,
  updateUserProfile,
  changePasswordController,
};
