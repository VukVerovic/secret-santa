export default function ParticipantsList({ participants = [], onDelete }) {
  return (
    <div>
      {participants.length === 0 ? (
        <div className="muted">Još nema učesnika.</div>
      ) : (
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          {participants.map((p) => (
            <li key={p.id} style={{ marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div>
                {p.name} <span className="muted">({p.email})</span>
              </div>
              {onDelete && (
                <button className="btn btn-alt" onClick={() => onDelete(p.id)}>
                  Obriši
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}