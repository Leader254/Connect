import express from "express";
import {
  addPosts,
  deletePost,
  getPosts,
  updatePost,
} from "../Controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPosts);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
