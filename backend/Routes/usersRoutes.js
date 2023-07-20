import express from "express";
import {
  getUser,
  updateUser,
  suggestedUsers,
  getFriends,
} from "../Controllers/users.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/update", loginRequired, updateUser);
router.get("/suggested", loginRequired, suggestedUsers);
router.get("/friends", loginRequired, getFriends);

export default router;
