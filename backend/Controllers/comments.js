import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// CREATE COMMENT CONTROLLER
export const createComment = async (req, res) => {
  const { description, createdAt, postId } = req.body;
  const userId = req.userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("description", sql.VarChar, description)
      .input("userId", sql.Int, userId)
      .input("createdAt", sql.DateTime, createdAt)
      .input("postId", sql.Int, postId)
      .query(
        "INSERT INTO Comments (description, userId, createdAt, postId) VALUES (@description, @userId, GETDATE(), @postId)"
      );
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

// ======= testing controller ====== //
// export const createComment = async (req, res) => {
//   const { description, createdAt, postId, userId } = req.body;
//   try {
//     const pool = await sql.connect(config.sql);
//     await pool
//       .request()
//       .input("description", sql.VarChar, description)
//       .input("userId", sql.Int, userId)
//       .input("createdAt", sql.DateTime, createdAt)
//       .input("postId", sql.Int, postId)
//       .query(
//         "INSERT INTO Comments (description, userId, createdAt, postId) VALUES (@description, @userId, GETDATE(), @postId)"
//       );
//     res.status(200).json({ message: "Comment added successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error });
//   }
// };

export const getAllComments = async (req, res) => {
  const { postId } = req.query;
  try {
    const pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("postId", sql.Int, postId)
      .query(
        `SELECT c.*, fullname, profilePic FROM Comments AS c JOIN Users AS u ON (u.id = c.userId) WHERE c.postId = @postId ORDER BY c.createdAt DESC`
      );
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  }
};

// DELETE COMMENT CONTROLLER
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .query("DELETE FROM Comments WHERE id = @id AND userId = @userId");
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
