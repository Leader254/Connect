import sql from "mssql";
import config from "../db/config.js";
import { v4 as uuidv4 } from "uuid";

export const createRoomId = async (req, res) => {
  const { senderId, receiverId } = req.body;
  // console.log(senderId, receiverId);
  // const senderId = userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("senderId", sql.Int, senderId)
      .input("receiverId", sql.Int, receiverId)
      .query(
        "SELECT * FROM Rooms WHERE (senderId = @senderId AND receiverId = @receiverId) OR (senderId = @receiverId AND receiverId = @senderId)"
      );
    if (result.recordset.length === 0) {
      const roomId = uuidv4();
      await pool
        .request()
        .input("roomId", sql.UniqueIdentifier, roomId)
        .input("senderId", sql.Int, senderId)
        .input("receiverId", sql.Int, receiverId)
        .query(
          "INSERT INTO Rooms (id, senderId, receiverId) VALUES (@roomId, @senderId, @receiverId)"
        );
      res.status(200).json({ roomId: roomId });
    } else {
      res.status(200).json({ roomId: result.recordset[0].id });
      // console.log(result.recordset[0].id);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
