import sql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../db/config.js";

// Login required middleware
export const loginRequired = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Not logged in!");
  } else {
    jwt.verify(token, config.jwt_secret, async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.userInfo = userInfo;
      next();
    });
  }
};

// Register logic
export const Register = async (req, res) => {
  const { username, email, fullname, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  // Set default profile picture URL
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("fullname", sql.VarChar, fullname)
      .query(
        "SELECT * FROM Users WHERE username = @username AND email = @email AND fullname = @fullname"
      );
    const user = result.recordset[0];

    if (user) {
      return res.status(400).send("User already exists");
    } else {
      await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("fullname", sql.VarChar, fullname)
        .input("password", sql.VarChar, hash)
        .input("profilePic", sql.VarChar, defaultProfilePic)
        .query(
          "INSERT INTO Users (username, email, fullname, password, profilePic) VALUES (@username, @email, @fullname, @password, @profilePic)"
        );
      return res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error occurred while creating the user" });
  } finally {
    sql.close();
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username = @username");

    const user = result.recordset[0];
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    } else {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
          },
          config.jwt_secret
        );

        const { password, ...userWithoutPassword } = user;

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json(userWithoutPassword);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error occurred while logging in" });
  }
};

// Logout logic
export const Logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};
