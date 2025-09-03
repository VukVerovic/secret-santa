// app.mjs
import "dotenv/config";
import express from "express";
import cors from "cors";

import userRouter from "./routers/userRouter.mjs";
import cardsRouter from "./routers/cardsRouter.mjs";
import { bodyParser } from "./middlewares/middlewares.mjs";

const app = express();

app.use(cors(), bodyParser, express.json());

// Rute

app.use("/user", userRouter);
app.use("/card", cardsRouter);

// Health-check
app.get("/health", (_req, res) => {
  res.send({ message: "ok" });
});

export default app;
