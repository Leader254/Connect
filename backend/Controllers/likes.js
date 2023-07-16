import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {
  const { postId } = req.query;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool.request().input("postId", sql.Int, postId).query(
      // `SELECT l.*, fullname, profilePic FROM Likes AS l JOIN Users AS u ON (u.id = l.userId) WHERE l.postId = @postId ORDER BY l.createdAt DESC`
      `SELECT userId FROM Likes WHERE postId = @postId`
    );
    return res.status(200).json(result.recordset.map((like) => like.userId));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  } finally {
    sql.close();
  }
};

export const addLike = async (req, res) => {
  const { postId } = req.body;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  console.log(token);

  jwt.verify(token, "userSecret", async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token is not valid" });
    const userId = decoded.id;
    try {
      let pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("postId", sql.Int, postId)
        .query("INSERT INTO Likes (userId, postId) VALUES (@userId, @postId)");
      res.status(200).json({ message: "Post has been liked successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    } finally {
      sql.close();
    }
  });
};

export const deleteLike = async (req, res) => {
  const { postId } = req.query;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  console.log(token);

  jwt.verify(token, "userSecret", async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token is not valid" });
    const userId = decoded.id;
    try {
      let pool = await sql.connect(config.sql);
      let result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("postId", sql.Int, postId)
        .query("DELETE FROM Likes WHERE userId = @userId AND postId = @postId");
      res.status(200).json({ message: "Post has been disliked" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    } finally {
      sql.close();
    }
  });
};
