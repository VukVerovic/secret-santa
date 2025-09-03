export default function CardItem({ card, users, onMove, onAssign, onDelete }) {
  return (
    <div className="card" style={{marginBottom:8, borderColor:"#eee"}}>
      <div style={{fontWeight:700, marginBottom:6}}>{card.title}</div>
      {card.description ? (
        <div className="muted" style={{whiteSpace:"pre-wrap", marginBottom:8}}>{card.description}</div>
      ) : null}

      <div className="row" style={{marginBottom:6}}>
        <select
          className="select inp"
          value={card.status}
          onChange={e => onMove(card.id, e.target.value)}
        >
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className="select inp"
          value={card.assigneeId ?? ""}
          onChange={e => onAssign(card.id, e.target.value ? String(e.target.value) : undefined)}
        >
          <option value="">Unassigned</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name || u.email}</option>)}
        </select>
      </div>

      <div className="row" style={{justifyContent:"space-between"}}>
        <div className="muted">#{card.id} • {new Date(card.createdAt).toLocaleDateString()}</div>
        <button className="btn" onClick={() => onDelete(card.id)}>Delete</button>
      </div>
    </div>
  )
}