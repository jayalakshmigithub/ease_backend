import { Message } from "../model/message.js";

const createMessage = async (data, userId) => {
  try {
    // console.log("Cretin msg for user:", userId);

    const { message, chatId } = data;
    const newMessage = new Message({
      senderId: userId,
      content: message,
      chatRoomId: chatId,
    });

    const result = await newMessage.save();
    // console.log("Msg created:", result);
    return result;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

const getMessages = async (chatId) => {
  try {
    const messages = await Message.find({ chatRoomId: chatId })
      .populate({
        path: "senderId",
        model: "user",
        select: "name email",
      })
      .exec();

    // console.log("Fetchd msgs:", messages);
    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};

export { createMessage, getMessages };
