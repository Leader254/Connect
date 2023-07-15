import sql from "mssql";
import config from "../db/config.js";

export const getStories = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .query(
        "SELECT s.*, u.id AS userId, fullname, profilePic FROM Stories AS s JOIN Users AS u ON (u.id = s.userId) ORDER BY s.createdAt DESC"
      );
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving" });
  } finally {
    sql.close();
  }
};
