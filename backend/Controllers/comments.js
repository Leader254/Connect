import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// CREATE COMMENT CONTROLLER
export const createComment = async (req, res) => {
  const { description, createdAt, postId } = req.body;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  console.log(token);

  jwt.verify(token, "userSecret", async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token is not valid" });
    const userId = decoded.id;

    let pool;
    try {
      pool = await sql.connect(config.sql);
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
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  });
};

// GET ALL COMMENTS CONTROLLER
export const getAllComments = async (req, res) => {
  const { postId } = req.query;
  let pool;
  try {
    pool = await sql.connect(config.sql);
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
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

// GET COMMENT CONTROLLER
export const getComment = async (req, res) => {};

// UPDATE COMMENT CONTROLLER
export const updateComment = async (req, res) => {};

// DELETE COMMENT CONTROLLER
export const deleteComment = async (req, res) => {};
