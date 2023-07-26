import sql from "mssql";
import config from "../db/config.js";

// working fine
export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("senderId", sql.Int, senderId)
      .input("receiverId", sql.Int, receiverId)
      .query(
        "INSERT INTO Chat (senderId, receiverId) VALUES (@senderId, @receiverId);"
      );

    const chat = result.recordset;
    res.status(200).json(chat);
    res.status(200).json({
      message: "Chat created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const pool = await sql.connect(config.sql);

    const query = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(
        "SELECT * FROM Chat WHERE senderId = @userId OR receiverId = @userId;"
      );

    const chat = query.recordset;
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const pool = await sql.connect(config.sql);

    const query = await pool
      .request()
      .input("firstId", sql.Int, firstId)
      .input("secondId", sql.Int, secondId)
      .query(
        "SELECT * FROM Chat WHERE (senderId = @firstId AND receiverId = @secondId) OR (senderId = @secondId AND receiverId = @firstId);"
      );

    const chat = query.recordset[0];
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
