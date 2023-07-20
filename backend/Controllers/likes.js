import sql from "mssql";
import config from "../db/config.js";

export const getLikes = async (req, res) => {
  const postId = req.query.postId;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("postId", sql.Int, postId)
      .query(`SELECT userId FROM Likes WHERE postId = @postId`);

    // Using optional chaining operator to safely access recordset
    const userIDs = result?.recordset.map((like) => like.userId);

    if (userIDs && userIDs.length > 0) {
      return res.status(200).json(userIDs);
    } else {
      return res.status(404).json({ error: "No likes found for the post" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  }
};

export const addLike = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .query("INSERT INTO Likes (userId, postId) VALUES (@userId, @postId)");
    res.status(200).json({ message: "Post has been liked successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const deleteLike = async (req, res) => {
  const { postId } = req.query;
  const userId = req.userInfo.id;
  try {
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("postId", sql.Int, postId)
      .query("DELETE FROM Likes WHERE userId = @userId AND postId = @postId");
    res.status(200).json({ message: "Post has been disliked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
