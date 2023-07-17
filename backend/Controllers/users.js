import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// getUser
export const getUser = async (req, res) => {
  const userId = req.params.userId;

  let pool;
  try {
    pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM Users WHERE id = @userId");
    const user = result.recordset[0];
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    } else {
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error occured while getting user" });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

// updateUser
export const updateUser = async (req, res) => {
  const { username, email, fullname, country, coverPic, profilePic } = req.body;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "userSecret", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    let pool;
    try {
      pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("fullname", sql.VarChar, fullname)
        .input("country", sql.VarChar, country)
        .input("coverPic", sql.VarChar, coverPic)
        .input("profilePic", sql.VarChar, profilePic)
        .input("userId", sql.Int, userInfo.id)
        .query(
          "UPDATE Users SET username = @username, email = @email, fullname = @fullname, country = @country, coverPic = @coverPic, profilePic = @profilePic WHERE id = @userId"
        );

      if (result.rowsAffected[0] === 0) {
        return res.status(403).json("You can update only your post!");
      }

      return res.json("Updated!");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error occurred while updating user" });
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  });
};

// suggestedUsers
export const suggestedUsers = async (req, res) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "userSecret", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    let pool;
    try {
      pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("userId", sql.Int, userInfo.id)
        .query("SELECT TOP 5 * FROM Users");

      return res.status(200).json(result.recordset);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error occurred while getting suggested users" });
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  });
};
