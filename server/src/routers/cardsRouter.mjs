import { Router } from "express";
import CardsController from "../controllers/CardController.mjs";

const router = Router();
const c = new CardsController();

router.get("/all", c.getAll.bind(c));
router.post("/create", c.create.bind(c));
router.post("/delete", c.delete.bind(c));
router.post("/move", c.move.bind(c));
router.post("/assign", c.assign.bind(c));

export default router;
