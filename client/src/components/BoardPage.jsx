import { useMemo, useState } from "react";
import CreateCard from "./CreateCard";
import CardItem from "./CardItem";

const COLS = [
  { key: "todo",  name: "To do" },
  { key: "doing", name: "In progress" },
  { key: "done",  name: "Done" },
];

export default function BoardPage({ model, onAddCard, onDeleteCard, onMoveCard, onAssignCard }) {
  const { users, cards } = model;
  const [filterUser, setFilterUser] = useState("all");

  const filtered = useMemo(() => {
    let list = [...cards];
      if (filterUser !== "all") {
        list = list.filter(c => String(c.assigneeId) === String(filterUser));
      }
    return list; // nema order sort
  }, [cards, filterUser]);

  return (
    <>
      <div className="card">
        <h3 style={{margin:0}}>Create card</h3>
        <CreateCard users={users} onAdd={onAddCard} />
      </div>

      <div className="card">
        <div className="row" style={{justifyContent:"space-between"}}>
          <div className="sub">One board • 3 columns (status)</div>
          <div className="row">
            <label className="muted">Filter by user:</label>
            <select
              className="select inp"
              value={filterUser}
              onChange={e => setFilterUser(e.target.value)}
            >
              <option value="all">All</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name || u.email}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="columns">
        {COLS.map(col => {
          const inCol = filtered.filter(c => c.status === col.key);
          return (
            <div key={col.key} className={`board-col ${col.key}`}>
              <h4 className="col-title">{col.name} ({inCol.length})</h4>
              {inCol.length === 0 ? (
                <div className="muted">No cards.</div>
              ) : (
                inCol.map(card => (
                  <CardItem
                    key={card.id}
                    card={card}
                    users={users}
                    onMove={onMoveCard}
                    onAssign={onAssignCard}
                    onDelete={onDeleteCard}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}