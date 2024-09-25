import jwt from "jsonwebtoken";
import * as userService from "../services/userServices.js";
import * as adminService from '../services/adminServices.js'
import { generateTokens } from "../utils/jwt/generateToken.js";
import config from "../config/config.js";





const refreshTokenController = async (req, res) => {
    try {
        console.log('USER')
        const userRole = req.body.userRole;
        console.log(userRole,"what is user role");
        
        const cookieName = userRole === "admin" ? "adminRefreshToken" : "userRefreshToken";
       console.log(req.cookies,'cooieess')
        const cookieToken = req.cookies[cookieName];
        console.log(cookieToken,'cookieToken')
        
        console.log(cookieName,'cookiname')
 
        if (!cookieToken) {
            return res.status(401).json({ message: "No token, authorization denied or token mismatch" });
        }

        let decoded;    
        try {
            
            decoded = jwt.verify(cookieToken, config.JWT_SECRET);
            console.log(decoded,'decodeee')
        } catch (err) {
            console.error("Token verification error", err);
            return res.status(401).json({ message: "Invalid token" });
        }

        if (!decoded ) {
            return res.status(401).json({ message: "Invalid token" });
        }

        let  user;
        if(userRole === " user "){
            user = await userService.getUserById(decoded.userId);
            if(user?.isBlocked){
                return res.status(401).json({message:"user is blocked "})
            }

        }else if(userRole === "admin"){
            console.log('userrorle',userRole)
            user = await adminService.getAdminById(decoded.userId);
        }else{
            return res.status(401).json({message:"invalid user role"})
        }
      
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = user._id
        const tokens = generateTokens(res, { userId,userRole });
        return res.status(200).json({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (error) {
        console.error("Error in refreshTokenController", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { refreshTokenController };




// import jwt from "jsonwebtoken";
// import * as userService from "../services/userServices.js";
// import { generateTokens } from "../utils/jwt/generateToken.js";
// import config from "../config/config.js";





// const refreshTokenController = async (req, res) => {
//     try {
//         console.log('USER')
//         const cookieName ="userRefreshToken";
//         const cookieToken = req.cookies[cookieName];
 
//         if (!cookieToken) {
//             return res.status(401).json({ message: "No token, authorization denied or token mismatch" });
//         }

//         let decoded;
//         try {
            
//             decoded = jwt.verify(cookieToken, config.JWT_SECRET);
//         } catch (err) {
//             console.error("Token verification error", err);
//             return res.status(401).json({ message: "Invalid token" });
//         }

//         if (!decoded ) {
//             return res.status(401).json({ message: "Invalid token" });
//         }

//         let user = await userService.getUserById(decoded.userId);
      
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const userId = user._id
//         const tokens = generateTokens(res, { userId });
//         return res.status(200).json({
//             accessToken: tokens.accessToken,
//             refreshToken: tokens.refreshToken,
//         });
//     } catch (error) {
//         console.error("Error in refreshTokenController", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// export { refreshTokenController };

