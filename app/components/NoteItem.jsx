export default function NoteItem({ note, index, isEditing, onEdit, onDelete }) {
  return (
    <article
      className={`note note-c${index % 3} ${isEditing ? "note-editing" : ""}`}
    >
      <span className="note-pin" />
      <h3 className="note-title">{note.title}</h3>
      <p className="note-desc">{note.description}</p>

      <div className="note-foot">
        <small>{note.date}</small>
        <div className="note-actions">
          <button className="btn-edit" onClick={() => onEdit(note)}>
            EDIT
          </button>
          <button className="btn-del" onClick={() => onDelete(note.id)}>
            DEL
          </button>
        </div>
      </div>
    </article>
  );
}