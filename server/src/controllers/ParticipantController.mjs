import Participant from "../models/Participant.mjs";

class ParticipantController {
  getAll = async (_req, res) => {
    try {
      const participants = await Participant.scan().exec();
      res.json({ participants });
    } catch {
      res.status(500).json({ error: "Error fetching participants" });
    }
  };

  create = async (req, res) => {
    try {
      const { name, email } = req.body;
      const id = Date.now().toString();
      const p = new Participant({ id, name, email });
      const saved = await p.save();
      res.status(201).json(saved);
    } catch {
      res.status(500).json({ error: "Error creating participant" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.body;
      await Participant.delete(id);
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: "Error deleting participant" });
    }
  };
}

export default ParticipantController;