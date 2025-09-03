import User from "../models/User.mjs";

class UserController {
  getAll = async (_req, res) => {
    try {
      const users = await User.scan().exec();
      res.json(users);
    } catch {
      res.status(500).json({ error: "Error fetching users" });
    }
  };

  create = async (req, res) => {
    try {
      const { email, name } = req.body;
      const id = Date.now().toString();
      const user = new User({ id, email, name });
      const newUser = await user.save();
      res.status(201).json(user);
    } catch {
      res.status(500).json({ error: "Error creating user" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.body;
      await User.delete(id);
      res.json({ ok: true });
    } catch {
      res.status(500).json({ error: "Error deleting user" });
    }
  };
}

export default UserController;
