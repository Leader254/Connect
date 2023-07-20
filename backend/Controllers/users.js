import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// getUser
export const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const pool = await sql.connect(config.sql);
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
  }
};

// updateUser
export const updateUser = async (req, res) => {
  const { username, email, fullname, country, coverPic, profilePic, bio } =
    req.body;
  const userInfo = req.userInfo;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("fullname", sql.VarChar, fullname)
      .input("country", sql.VarChar, country)
      .input("coverPic", sql.VarChar, coverPic)
      .input("profilePic", sql.VarChar, profilePic)
      .input("bio", sql.VarChar, bio)
      .input("userId", sql.Int, userInfo.id)
      .query(
        "UPDATE Users SET username = @username, email = @email, fullname = @fullname, country = @country, coverPic = @coverPic, profilePic = @profilePic, bio = @bio WHERE id = @userId"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(403).json("You can update only your profile");
    }

    return res.json("Updated!");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while updating user" });
  }
};

export const suggestedUsers = async (req, res) => {
  const userInfo = req.userInfo;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().input("userId", sql.Int, userInfo.id)
      .query(`
    SELECT TOP 5 *
    FROM Users u
    WHERE u.id <> @userId
      AND NOT EXISTS (
        SELECT 1
        FROM Relationships r
        WHERE (r.followerUserId = @userId AND r.followedUserId = u.id)
          OR (r.followerUserId = u.id AND r.followedUserId = @userId)
      )
      AND u.id NOT IN (
        SELECT followedUserId
        FROM Relationships
        WHERE followerUserId = @userId
      )
    ORDER BY NEWID()
  `);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while getting suggested users" });
  }
};

// friends controller
export const getFriends = async (req, res) => {
  const userInfo = req.userInfo;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().input("userId", sql.Int, userInfo.id)
      .query(`
    SELECT *
    FROM Users u
    WHERE u.id <> @userId
      AND EXISTS (
        SELECT 1
        FROM Relationships r
        WHERE (r.followerUserId = @userId AND r.followedUserId = u.id)
      )
    ORDER BY NEWID()
  `);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while getting random friends" });
  }
};
