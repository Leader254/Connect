import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "userSecret", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    try {
      const pool = await sql.connect(config.sql);
      const request = pool.request();

      let result;
      if (userId !== "undefined") {
        result = await request
          .input("userId", sql.Int, userId)
          .query(
            `SELECT p.*, fullname, profilePic FROM Posts AS p JOIN Users AS u ON (u.id = p.userId) WHERE p.userId = @userId ORDER BY p.createdAt DESC`
          );
      } else {
        result = await request
          .input("followerUserId", sql.Int, userInfo.id)
          .query(
            `SELECT p.*, fullname, profilePic FROM Posts AS p JOIN Users AS u ON (u.id = p.userId) LEFT JOIN Relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = @followerUserId OR p.userId = @followerUserId ORDER BY p.createdAt DESC`
          );
      }

      await pool.close();

      return res.status(200).json(result.recordset);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
};

export const addPosts = async (req, res) => {
  const { description, userId, createdAt, image } = req.body;

  let pool;
  try {
    pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("description", sql.VarChar, description)
      .input("userId", sql.Int, userId)
      .input("createdAt", sql.DateTime, createdAt)
      .input("image", sql.VarChar, image)
      .query(
        "INSERT INTO Posts (description, userId, createdAt, image) VALUES (@description, @userId, GETDATE(), @image)"
      );
    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

// Deleting a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  let pool;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Posts WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while deleting post!!" });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

// Updating a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { description, image } = req.body;

  let pool;
  try {
    pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("description", sql.VarChar, description)
      .input("image", sql.VarChar, image)
      .query(
        "UPDATE Posts SET description = @description, image = @image WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Posts Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occured while updating post" });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};
