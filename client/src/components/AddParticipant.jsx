import { useState } from "react";

export default function AddParticipant({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function submit(e){
    e.preventDefault();
    if(!name.trim() || !email.trim()) return;
    await onAdd({ name: name.trim(), email: email.trim() });
    setName(""); setEmail("");
  }

  return (
    <div className="card">
      <h3 style={{margin:0}}>Dodaj učesnika</h3>
      <form onSubmit={submit} className="row" style={{marginTop:8}}>
        <input className="inp" placeholder="Ime..." value={name} onChange={e=>setName(e.target.value)} />
        <input className="inp" placeholder="Email..." value={email} onChange={e=>setEmail(e.target.value)} type="email" />
        <button className="btn">Dodaj</button>
      </form>
      <div className="muted" style={{marginTop:6}}>Potrebna su minimum 2 učesnika za žreb.</div>
    </div>
  );
}