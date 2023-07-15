import express from "express";

// comments routes

import {
  createComment,
  updateComment,
  getAllComments,
  deleteComment,
  getComment,
} from "../Controllers/comments.js";

const router = express.Router();

router.post("/", createComment);
router.put("/update/:commentId", updateComment);
router.get("/", getAllComments);
router.delete("/delete/:commentId", deleteComment);
router.get("/find/:commentId", getComment);

export default router;
