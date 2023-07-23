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
// router.put("/update", updateUser);
router.get("/suggested", loginRequired, suggestedUsers);
router.get("/suggested", suggestedUsers);
router.get("/friends", loginRequired, getFriends);
// router.get("/friends", getFriends);

export default router;
