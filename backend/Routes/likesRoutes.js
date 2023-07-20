import express from "express";

import { getLikes, addLike, deleteLike } from "../Controllers/likes.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();

router.post("/", loginRequired, addLike);
router.get("/", getLikes);
router.delete("/", loginRequired, deleteLike);

export default router;
