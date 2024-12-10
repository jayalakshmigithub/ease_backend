const userSockets = new Map(); 
const chatSockets = new Map();

export function initializeSocket(io) {
    console.log('hiii from socket connection')
    io.on("connection", (socket) => {
       
        
        socket.on("join-chat", (currentChatRoomId) => {
            if (currentChatRoomId) {
                if (!chatSockets.has(currentChatRoomId)) {
                    chatSockets.set(currentChatRoomId, new Set());
                }
                chatSockets.get(currentChatRoomId).add(socket.id);
                console.log(`Socket ${socket.id} joined chat ${currentChatRoomId}`);
            }
        });
        
        socket.on("send-message", async (data) => {
            try {
              const { message } = data;
              const {senderId,chatRoomId} = message
              if (!senderId || !chatRoomId) {
                  throw new Error("Invalid message data");
                }
                if (chatSockets.has(chatRoomId)) {
                    chatSockets.get(chatRoomId).forEach((socketId) => {
                        io.to(socketId).emit("receive-message", message);
                        console.log(`Message sent to socket ${socketId} in chat ${chatRoomId}`);
                    });
                } else {
                    console.log(`No active sockets found for chat ${chatRoomId}`);
                }
            } catch (error) {
              console.error("Error handling send-message event:", error);
            }
          });

     

        socket.on("mark-as-read", (data) => {
            try {
                const { messageIds, userId } = data;
        
                if (!messageIds || !userId) {
                    throw new Error("Invalid data for mark-as-read");
                }
        
messageIds.forEach((messageId) => {
    for (const [chatRoomId, sockets] of chatSockets.entries()) {
        if (sockets.has(socket.id)) {
            sockets.forEach((socketId) => {
                io.to(socketId).emit("message-read", {
                    messageIds: [messageId], 
                    readerId: userId,
                });
                console.log(
                    `Message ${messageId} marked as read by user ${userId} in chat ${chatRoomId}`
                );
            });
        }
    }
});

            } catch (error) {
                console.error("Error handling mark-as-read event:", error);
            }
        });
        


        socket.on("disconnect", () => {
            for (const [userId, sockets] of userSockets.entries()) {
                if (sockets.has(socket.id)) {
                    sockets.delete(socket.id);
                    if (sockets.size === 0) {
                        userSockets.delete(userId);
                    }
                    break;
                }
            }
        });
    });
}






        //   socket.on("mark-as-read", (data) => {
        //     try {
        //         const { messageIds, userId } = data;

        //         if (!messageIds || !userId) {
        //             throw new Error("Invalid data for mark-as-read");
        //         }

        //         // Broadcast the message-read event to all sockets in the chat room
        //         messageIds.forEach((messageId) => {
        //             for (const [chatRoomId, sockets] of chatSockets.entries()) {
        //                 if (sockets.has(socket.id)) {
        //                     sockets.forEach((socketId) => {
        //                         io.to(socketId).emit("message-read", {
        //                             messageId,
        //                             readerId: userId,
        //                         });
        //                         console.log(
        //                             `Message ${messageId} marked as read by user ${userId} in chat ${chatRoomId}`
        //                         );
        //                     });
        //                 }
        //             }
        //         });
        //     } catch (error) {
        //         console.error("Error handling mark-as-read event:", error);
        //     }
        // });



   //   socket.on("mark-as-read", ({ messageId, chatRoomId }) => {
        //     try {
        //         if (!messageId || !chatRoomId) {
        //             throw new Error("Invalid data for mark-as-read");
        //         }

              
        //         if (chatSockets.has(chatRoomId)) {
        //             chatSockets.get(chatRoomId).forEach((socketId) => {
        //                 io.to(socketId).emit("message-read", {
        //                     messageId,
        //                     chatRoomId,
        //                 });
        //             });
        //         }
        //         console.log(`Message ${messageId} marked as read in chat ${chatRoomId}`);
        //     } catch (error) {
        //         console.error("Error handling mark-as-read event:", error);
        //     }
        // });