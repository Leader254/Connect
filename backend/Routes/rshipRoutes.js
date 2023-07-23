import express from "express";

import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../Controllers/relationship.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();

router.post("/", loginRequired, addRelationship);
// router.post("/", addRelationship);
router.get("/", getRelationships);
router.delete("/", loginRequired, deleteRelationship);
// router.delete("/", deleteRelationship);

export default router;
