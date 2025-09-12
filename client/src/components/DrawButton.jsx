export default function DrawButton({ onDraw, onReset, disabled }) {
  return (
    <div className="card">
      <h3 style={{margin:0}}>Žreb</h3>
      <p className="muted" style={{margin:"6px 0 8px"}}>Kada sakupiš učesnike, pokreni žreb.</p>
      <div className="row">
        <button className="btn" onClick={onDraw} disabled={disabled}>Pokreni žreb</button>
        <button className="btn secondary" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}