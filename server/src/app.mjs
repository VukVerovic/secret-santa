// app.mjs
import "dotenv/config";
import express from "express";
import cors from "cors";

import participantRouter from "./routers/participantRouter.mjs";
import drawRouter from "./routers/drawRouter.mjs";
import { bodyParser } from "./middlewares/middlewares.mjs";

const app = express();

app.use(cors(), bodyParser, express.json());

// Rute
app.use("/participants", participantRouter);
app.use("/draw", drawRouter);

// Health
app.get("/health", (_req, res) => res.send({ message: "ok" }));

export default app;