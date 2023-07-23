import express from "express";
import {
  addPosts,
  deletePost,
  getPosts,
  updatePost,
  getSinglePost,
} from "../Controllers/posts.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();

router.get("/:id", getSinglePost);
router.get("/", loginRequired, getPosts);
router.post("/", addPosts);
router.delete("/:id", deletePost);
router.put("/:id", loginRequired, updatePost);

export default router;
