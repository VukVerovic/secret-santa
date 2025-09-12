import { useEffect, useMemo, useState } from "react";
import "./styles/app.css";
import AddParticipant from "./components/AddParticipant";
import ParticipantsList from "./components/ParticipantsList";
import { apiGet, apiPost } from "./services/api.jsx";

function Header() {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div className="brand">
        <img src="/secret-santa.jpg" alt="Secret Santa" />
        <div>
          <h1 className="h1" style={{ margin: 0 }}>Secret Santa</h1>
          <div className="sub">Random razmena poklona</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [pairs, setPairs] = useState([]);

  async function fetchParticipants() {
    const res = await apiGet("/participants/all");
    setParticipants(Array.isArray(res) ? res : (res.participants || []));
  }
  async function fetchPairs() {
    const res = await apiGet("/draw/pairs");
    setPairs(res?.pairs || []);
  }
  useEffect(() => { fetchParticipants(); fetchPairs(); }, []);

  async function addParticipant({ name, email }) {
    const created = await apiPost("/participants/create", { name, email });
    if (created?.id) setParticipants(prev => [...prev, created]); else await fetchParticipants();
    setPairs([]);
  }
  async function deleteParticipant(id) {
    await apiPost("/participants/delete", { id });
    setParticipants(prev => prev.filter(p => p.id !== id));
    setPairs([]);
  }
  async function runDraw() { await apiPost("/draw/run", {}); await fetchPairs(); }
  async function resetDraw() { await apiPost("/draw/reset", {}); setPairs([]); }

  const model = useMemo(() => ({ participants, pairs }), [participants, pairs]);

  return (
    <div className="wrap">
      <div className="snow" />
      <Header />

      <div className="grid">
        <div className="card">
          <h3 style={{ margin: "0 0 8px" }}>Učesnici ({participants.length})</h3>
          <AddParticipant onAdd={addParticipant} />
          <div className="divider" />
          <ParticipantsList participants={participants} onDelete={deleteParticipant} />
        </div>

        <div className="card">
          <h3 style={{ margin: "0 0 8px" }}>Raspored kupovine poklona</h3>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
            <div className="row">
              <button className="btn" onClick={runDraw} disabled={participants.length < 2}>Pokreni žreb</button>
              <button className="btn-secondary" onClick={resetDraw} disabled={pairs.length === 0}>Resetuj</button>
            </div>
          </div>
          <div className="divider" />
          <h4 className="col-title">Rezultati</h4>
          {model.pairs.length === 0 ? (
            <div className="muted">Rezultati će se pojaviti nakon žreba.</div>
          ) : (
            <ul style={{ marginTop: 8 }}>
              {model.pairs.map((p, idx) => (
                <li key={idx}>
                  <strong>{p.giver?.name}</strong>{" "}
                  <span className="muted">({p.giver?.email})</span>
                  {" → "}
                  <strong>{p.receiver?.name}</strong>{" "}
                  <span className="muted">({p.receiver?.email})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}