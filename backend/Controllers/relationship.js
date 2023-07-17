import sql from "mssql";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

export const getRelationships = async (req, res) => {
  const followedUserId = req.query.followedUserId;
  let pool;
  try {
    pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("followedUserId", sql.Int, followedUserId)
      .query(
        `SELECT followerUserId FROM Relationships WHERE followedUserId = @followedUserId`
      );
    return res
      .status(200)
      .json(
        result.recordset.map((relationship) => relationship.followerUserId)
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  jwt.verify(token, "userSecret", async (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Token is not valid!" });

    const followerUserId = userInfo.id;
    const followedUserId = req.body.userId;

    try {
      const pool = await sql.connect(config.sql);
      await pool
        .request()
        .input("followerUserId", sql.Int, followerUserId)
        .input("followedUserId", sql.Int, followedUserId)
        .query(
          "INSERT INTO Relationships (followerUserId, followedUserId) VALUES (@followerUserId, @followedUserId)"
        );

      res.status(200).json({ message: "Relationship added successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not logged in!" });

  jwt.verify(token, "userSecret", async (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Token is not valid!" });

    const followerUserId = userInfo.id;
    const followedUserId = req.query.userId;

    try {
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("followerUserId", sql.Int, followerUserId)
        .input("followedUserId", sql.Int, followedUserId)
        .query(
          "DELETE FROM Relationships WHERE followerUserId = @followerUserId AND followedUserId = @followedUserId"
        );

      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  });
};
