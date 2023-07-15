import sql from "mssql";
import config from "../db/config.js";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE id = @id");
    const user = result.recordset[0];
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    } else {
      const { id, username, fullname, email, profilePic, coverPic, country } =
        user;
      return res.status(200).json({
        id: id,
        username: username,
        fullname: fullname,
        email: email,
        profilePic: profilePic,
        coverPic: coverPic,
        country: country,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error occured while getting user" });
  } finally {
    sql.close();
  }
};
