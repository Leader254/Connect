import express from "express";
import { createRoomId } from "../Controllers/createRoomId.js";
// import { chatMessage } from "../Controllers/chatController.js";

const router = express.Router();

router.post("/createRoomId", createRoomId);
// router.post("/chatMessage", chatMessage);
// router.get("/", fetchChats);
// router.post("/", accessChat);

export default router;
