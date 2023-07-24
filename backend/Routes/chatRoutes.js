import express from "express";
import { createRoomId } from "../Controllers/createRoomId.js";

const router = express.Router();

router.post("/createRoomId", createRoomId);
// router.get("/", fetchChats);
// router.post("/", accessChat);

export default router;
