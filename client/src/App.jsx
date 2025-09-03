import { useEffect, useMemo, useState } from "react";
import "./styles/app.css";
import BoardPage from "./components/BoardPage";
import UsersPanel from "./components/UsersPanel";
import { apiGet, apiPost } from "./services/api.jsx";

export default function App() {
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

  async function fetchUsers() {
    const u = await apiGet("/user/all");
    setUsers(Array.isArray(u) ? u : u?.users || []);
  }

  async function fetchCards() {
    const c = await apiGet("/card/all");
    setCards(Array.isArray(c) ? c : c?.cards || []);
  }

  useEffect(() => {
    fetchUsers();
    fetchCards();
  }, []);

  // USERS
  async function addUser({ email, name }) {
    const created = await apiPost("/user/create", { email, name });
    setUsers((prev) => [...prev, created]);
  }

  async function deleteUser(id) {
    await apiPost("/user/delete", { id });
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setCards((prev) =>
      prev.map((c) =>
        c.assigneeId === id ? { ...c, assigneeId: undefined } : c
      )
    );
  }

  async function addCard({ title, description, assigneeId }) {
    const created = await apiPost("/card/create", {
      title,
      description,
      assigneeId,
    });
    fetchCards();
  }

  async function deleteCard(id) {
    await apiPost("/card/delete", { id });
    fetchCards();
  }

  async function moveCard(id, status) {
    const updated = await apiPost("/card/move", { id, status });
    fetchCards();
  }

  async function assignCard(id, assigneeId) {
    const updated = await apiPost("/card/assign", { id, assigneeId });
    fetchCards();
  }

  const model = useMemo(() => ({ users, cards }), [users, cards]);

  return (
    <div className="wrap">
      <h1 className="h1">Kanban</h1>
      <div className="grid">
        <UsersPanel
          users={users}
          onAddUser={addUser}
          onDeleteUser={deleteUser}
        />
        <BoardPage
          model={model}
          onAddCard={addCard}
          onDeleteCard={deleteCard}
          onMoveCard={moveCard}
          onAssignCard={assignCard}
        />
      </div>
    </div>
  );
}
