const userSockets = new Map(); 
const chatSockets = new Map();

export function initializeSocket(io) {
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
