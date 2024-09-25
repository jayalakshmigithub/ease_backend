import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email: {
        type: String,
        unique: true, 
        required: true 
    },
    password:{
        type:String
    },
    isGoogle:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isInvited:{
        type:Boolean,
        default:false

    },
    otp:{
        type:String
    },
    image:{
        type:String
    },

    workspace:{
        type:Array,
        default:[]
    },
    sharedWorkspaces: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Workspace', 
        },
      ],
  
},{timestamps:true});

userSchema.index({email:1} ,{unique:true})
const userModel = mongoose.model("user",userSchema)
export {userModel}
