import { Router } from "express";
import ParticipantController from "../controllers/ParticipantController.mjs";

const router = Router();
const c = new ParticipantController();

router.get("/all", c.getAll.bind(c));
router.post("/create", c.create.bind(c));
router.post("/delete", c.delete.bind(c));

export default router;