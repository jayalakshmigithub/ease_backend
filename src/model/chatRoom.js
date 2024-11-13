// import mongoose, { Schema } from "mongoose";

// const chatRoomSchema = new mongoose.Schema(
//   {
//     senderId: {
//       type: String,
//       ref: "user",
//     },
//     receiverId: {
//       type: String,
//       ref: "user",
//     },
//     messageId: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],

//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  // messages: [{
  //   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  //   text: String,
  //   createdAt: { type: Date, default: Date.now }
  // }]
  messageId: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
});

const ChatRoom = mongoose.model("chatRoom", chatRoomSchema);
export { ChatRoom };
