import Card from "../models/Card.mjs";

class CardController {
  getAll = async (_req, res) => {
    try {
      const cards = await Card.scan().exec();
      res.json({ cards });
    } catch {
      res.status(500).json({ error: "Error fetching cards" });
    }
  };

  create = async (req, res) => {
    try {
      const { title, description, assigneeId } = req.body;
      const id = Date.now().toString();
      const card = new Card({ id, title, description, assigneeId });
      await card.save();
      res.status(201).json(card);
    } catch (e) {
      console.log("Error creating card:", e);
      res.status(500).json({ error: "Error creating card" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.body;
      await Card.delete(id);
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: "Error deleting card" });
    }
  };

  move = async (req, res) => {
    try {
      const { id, status } = req.body;
      const card = await Card.get(id);
      if (!card) return res.status(404).json({ error: "Card not found" });
      card.status = status;
      await card.save();
      res.json(card);
    } catch {
      res.status(500).json({ error: "Error moving card" });
    }
  };

  assign = async (req, res) => {
    try {
      const { id, assigneeId } = req.body;
      const card = await Card.get(id);
      if (!card) return res.status(404).json({ error: "Card not found" });
      card.assigneeId = assigneeId || undefined;
      await card.save();
      res.json(card);
    } catch {
      res.status(500).json({ error: "Error assigning card" });
    }
  };
}

export default CardController;
