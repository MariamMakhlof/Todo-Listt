import { useState } from 'react'

function TodoItem({ id, status = 'pending', text = 'Sample todo', onComplete, onDelete, onUpdate, isDragging, onDragStart, onDropItem, onDragOver }) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(text)
  const statusIcons = { done: '✓' }
  const statusLabels = { pending: 'Mark complete', done: 'Mark pending' }

  const saveEdit = (event) => {
    event.preventDefault()
    if (!editText.trim()) return
    onUpdate?.(id, editText)
    setEditing(false)
  }
  const cancelEdit = () => { setEditText(text); setEditing(false) }

  return (
    <article
      className={`todo-item ${status} ${editing ? 'is-editing' : ''} ${isDragging ? 'dragging' : ''}`}
      draggable={!editing}
      onDragStart={(event) => { event.dataTransfer.effectAllowed = 'move'; onDragStart?.() }}
      onDragOver={onDragOver}
      onDrop={onDropItem}
    >
      {!editing && <span className="todo-drag-handle" aria-hidden="true" title="Drag to reorder">⠿</span>}
      <button type="button" className="todo-status-icon" aria-label={statusLabels[status]} title={statusLabels[status]} onClick={() => onComplete?.(id)}>{statusIcons[status] || ''}</button>
      {editing ? (
        <form className="todo-edit-form" onSubmit={saveEdit}>
          <input className="form-input todo-edit-input" aria-label="Edit task" autoFocus value={editText} onChange={(event) => setEditText(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') cancelEdit() }} />
          <button type="submit" className="todo-btn todo-btn-save" aria-label="Save edit" title="Save">Save</button>
          <button type="button" className="todo-btn todo-btn-cancel-edit" onClick={cancelEdit} aria-label="Cancel editing" title="Cancel">Cancel</button>
        </form>
      ) : (
        <>
          <p className="todo-text">{text}</p>
          <div className="todo-actions">
            <button type="button" className="todo-btn todo-btn-edit" onClick={() => { setEditText(text); setEditing(true) }} aria-label="Edit task" title="Edit task">✎</button>
            <button type="button" className="todo-btn todo-btn-delete" onClick={() => onDelete?.(id)} aria-label="Delete task" title="Delete task">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7m4 3v7m4-7v7" /></svg>
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default TodoItem
