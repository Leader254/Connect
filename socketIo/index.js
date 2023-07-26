const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

//   add a new user
io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    // if user is not in activeUsers array, add them
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ socketId: socket.id, userId: newUserId });
    }

    console.log("connected User", activeUsers);
    // send activeUsers array to all users
    io.emit("get-users", activeUsers);
  });

  //   send-message
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
  });

  //   remove a user
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});
