import express from "express";

import {
  createComment,
  getAllComments,
  deleteComment,
} from "../Controllers/comments.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();

router.post("/", loginRequired, createComment);
// router.post("/", createComment);
router.get("/", getAllComments);
router.delete("/:id", loginRequired, deleteComment);

export default router;
