import { useRef } from "react";

export default function UsersPanel({ users, onAddUser, onDeleteUser }) {
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const name = nameRef.current?.value || "";

    if (!email.trim()) return;
    onAddUser({ email, name });

    if (emailRef.current) emailRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
  }

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 8px" }}>Users</h3>
      <form onSubmit={submit} className="row" style={{ marginBottom: 8 }}>
        <input className="inp" placeholder="email…" ref={emailRef} />
        <input className="inp" placeholder="name (optional)…" ref={nameRef} />
        <button className="btn">Add user</button>
      </form>

      {users.length === 0 ? (
        <div className="muted">No users.</div>
      ) : (
        users.map((u) => (
          <div
            key={u.id}
            className="row"
            style={{ justifyContent: "space-between", marginBottom: 6 }}
          >
            <div>
              {u.name || u.email} <span className="muted">({u.email})</span>
            </div>
            <button className="btn" onClick={() => onDeleteUser(u.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
