import { Router } from "express";
import DrawController from "../controllers/DrawController.mjs";

const router = Router();
const d = new DrawController();

router.post("/run", d.run.bind(d));
router.get("/pairs", d.list.bind(d));
router.post("/reset", d.reset.bind(d));

export default router;