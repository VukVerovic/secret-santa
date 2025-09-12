export default function PairsList({ pairs = [] }) {
  return (
    <div className="card">
      <h3 style={{margin:0}}>Parovi</h3>
      {pairs.length === 0 ? (
        <div className="muted" style={{marginTop:8}}>Žreb još nije urađen.</div>
      ) : (
        <ul style={{marginTop:8}}>
          {pairs.map((p, i) => (
            <li key={i}>
              <strong>{p.giver?.name}</strong> <span className="muted">({p.giver?.email})</span>
              {" → "}
              <strong>{p.receiver?.name}</strong> <span className="muted">({p.receiver?.email})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}