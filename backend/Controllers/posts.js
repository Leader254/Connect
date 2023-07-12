import sql from "mssql";
import config from "../db/config.js";

// getting all posts
export const getPosts = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .query(
        "SELECT p.*, u.id AS userId, fullname, profilePic FROM Posts AS p JOIN Users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC"
      );
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  } finally {
    sql.close();
  }
};

// creating posts
export const addPosts = async (req, res) => {
  const { description, userId, createdAt, image } = req.body;
  try {
    let pool = await sql.connect(config.sql);
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
    sql.close();
  }
};

// Deleting a post
export const deletePost = async (req, res) => {
  const { id } = req.params;
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
    sql.close();
  }
};

// Updating a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { description, image } = req.body;

  try {
    let pool = await sql.connect(config.sql);
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
    sql.close();
  }
};
