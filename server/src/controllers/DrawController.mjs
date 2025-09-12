import Participant from "../models/Participant.mjs";
import Assignment from "../models/Assignment.mjs";
import { v4 as uuid } from "uuid";

class DrawController {
  // POST /draw/run
  run = async (_req, res) => {
    try {
      const participants = await Participant.scan().exec();
      if (!participants || participants.length < 2) {
        return res.status(400).json({ error: "Potrebno je bar 2 učesnika." });
      }

      // očisti prethodne parove
      const existing = await Assignment.scan().exec();
      if (existing.length) {
        await Promise.all(existing.map(a => Assignment.delete(a.id)));
      }

      // napravi raspored (shuffle + korekcija da niko ne dobije sebe)
      const ids = participants.map(p => p.id);
      const shuffled = [...ids].sort(() => Math.random() - 0.5);
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] === shuffled[i]) {
          const j = (i + 1) % ids.length;
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      }

      const toSave = [];
      for (let i = 0; i < ids.length; i++) {
        const id = uui;
        toSave.push(new Assignment({ id, giverId: ids[i], receiverId: shuffled[i] }).save());
      }
      await Promise.all(toSave);

      res.status(201).json({ message: "Žreb završen." });
    } catch (e) {
      console.log("Draw error:", e);
      res.status(500).json({ error: "Greška pri žrebu." });
    }
  };

  // GET /draw/pairs
  list = async (_req, res) => {
    try {
      const [pairs, participants] = await Promise.all([
        Assignment.scan().exec(),
        Participant.scan().exec()
      ]);

      const byId = new Map(participants.map(p => [p.id, p]));
      const view = pairs.map(a => ({
        giver: byId.get(a.giverId) ? { id: a.giverId, name: byId.get(a.giverId).name, email: byId.get(a.giverId).email } : null,
        receiver: byId.get(a.receiverId) ? { id: a.receiverId, name: byId.get(a.receiverId).name, email: byId.get(a.receiverId).email } : null
      }));
      res.json({ pairs: view });
    } catch {
      res.status(500).json({ error: "Greška pri čitanju parova." });
    }
  };

  // POST /draw/reset
  reset = async (_req, res) => {
    try {
      const all = await Assignment.scan().exec();
      await Promise.all(all.map(a => Assignment.delete(a.id)));
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: "Greška pri resetovanju." });
    }
  };
}

export default DrawController;