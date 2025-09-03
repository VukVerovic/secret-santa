import { useRef } from "react";

export default function CreateCard({ users, onAdd }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const assigneeRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const description = descRef.current?.value || "";
    const assigneeRaw = assigneeRef.current?.value || "";
    if (!title.trim()) return;

    onAdd({
      title,
      description,
      assigneeId: assigneeRaw ? String(assigneeRaw) : undefined,
    });

    // reset polja bez rerendera
    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
    if (assigneeRef.current) assigneeRef.current.value = "";
  }

  return (
    <form onSubmit={submit} className="grid">
      <input className="inp" placeholder="Title…" ref={titleRef} />
      <textarea className="inp" placeholder="Description…" ref={descRef} />
      <div className="row">
        <select className="select inp" ref={assigneeRef} defaultValue="">
          <option value="">Assignee (optional)</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>
        <button className="btn">Add</button>
      </div>
    </form>
  );
}
