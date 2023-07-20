import sql from "mssql";
import config from "../db/config.js";

export const chatMessage = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    const roomId = socket.handshake.query.roomId;
    socket.join(roomId);

    socket.on("joinRoom", async (roomId) => {
      let pool;
      try {
        pool = await sql.connect(config);
        const result = await pool
          .request()
          .input("roomId", sql.Int, roomId)
          .input("senderId", sql.Int, senderId)
          .input("receiverId", sql.Int, receiverId)
          .query(
            "SELECT * FROM Messages WHERE roomId = @roomId AND (senderId = @senderId OR receiverId = @receiverId) ORDER BY createdAt ASC"
          );
        socket.emit("output-messages", result.recordset);
      } catch {
        console.log(err);
      } finally {
        await pool.close();
      }
    });

    socket.on("chat", async (data) => {
      let pool;
      try {
        pool = await sql.connect(config);
        const result = await pool
          .request()
          .input("senderId", sql.Int, data.senderId)
          .input("recieverId", sql.Int, data.recieverId)
          .input("roomId", sql.Int, data.roomId)
          .input("message", sql.NVarChar, data.message)
          .input("createdAt", sql.DateTime, data.createdAt)
          .query(
            "INSERT INTO Messages (senderId, roomId, receiverId, message, createdAt) VALUES (@senderId, @roomId, @recieverId, @message, GETDATE())"
          );

        if (result.rowsAffected[0] > 0) {
          const selectMessage = await pool
            .request()
            .input("roomId", sql.Int, data.roomId)
            .input("senderId", sql.Int, data.senderId)
            .input("receiverId", sql.Int, data.receiverId)
            .query(
              "SELECT * FROM Messages WHERE roomId = @roomId AND (senderId = @senderId OR receiverId = @receiverId) ORDER BY createdAt DESC"
            );
          const newMessage = selectMessage.recordset[0];
          socket.to(data.roomId).emit("chat", newMessage);
        }
      } catch (err) {
        console.log(err);
      } finally {
        await pool.close();
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      socket.leave(roomId);
    });
  });
};
