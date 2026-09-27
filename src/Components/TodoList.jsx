import TodoItem from './TodoItem';
import { useState } from 'react'

function TodoList({ todos = [], onComplete, onDelete, onUpdate, onReorder }) {
  const [draggedId, setDraggedId] = useState(null)

  return (
    <div className="todo-list" onDragEnd={() => setDraggedId(null)}>
      {todos.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">✓</div>
          <h2>Make room for what matters</h2>
          <p>Add your first task above and get your day moving.</p>
        </div>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          status={todo.status}
          text={todo.text}
          onComplete={onComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isDragging={draggedId === todo.id}
          onDragStart={() => setDraggedId(todo.id)}
          onDropItem={(event) => {
            event.preventDefault()
            if (draggedId !== null && draggedId !== todo.id) onReorder?.(draggedId, todo.id)
            setDraggedId(null)
          }}
          onDragOver={(event) => event.preventDefault()}
        />
      ))}
    </div>
  );
}

export default TodoList;
