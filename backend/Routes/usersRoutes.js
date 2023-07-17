import express from "express";
import { getUser, updateUser, suggestedUsers } from "../Controllers/users.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/update", updateUser);
router.get("/suggested", suggestedUsers);

export default router;
