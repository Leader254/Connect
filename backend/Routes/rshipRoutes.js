import express from "express";

import {
  getRelationships,
  addRelationship,
  deleteRelationship,
} from "../Controllers/relationship.js";

const router = express.Router();

router.post("/", addRelationship);
router.get("/", getRelationships);
router.delete("/", deleteRelationship);

export default router;
