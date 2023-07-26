import sql from "mssql";
import config from "../db/config.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    const query = await pool
      .request()
      .input("chatId", sql.Int, chatId)
      .input("senderId", sql.Int, senderId)
      .input("text", sql.NVarChar, text)
      .query(
        "INSERT INTO Message (chatId, senderId, text) VALUES (@chatId, @senderId, @text);"
      );

    const messageId = query.recordset;
    return res.status(200).json(messageId);
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const query = await pool
      .request()
      .input("chatId", sql.Int, chatId)
      .query("SELECT * FROM Message WHERE chatId = @chatId;");

    const messages = query.recordset;
    return res.json(messages);
  } catch (error) {
    throw error;
  }
};
