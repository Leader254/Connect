import express from "express";

import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../Controllers/relationship.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();

router.post("/", loginRequired, addRelationship);
router.get("/", getRelationships);
router.delete("/", loginRequired, deleteRelationship);

export default router;
