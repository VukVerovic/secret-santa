import { Router } from "express";
import UserController from "../controllers/UserController.mjs";

const router = Router();
const c = new UserController();

router.get("/all", c.getAll);
router.post("/create", c.create.bind(c));
router.post("/delete", c.delete);

export default router;
