import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        onAddTodo(inputValue);
        setInputValue('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-input"
                    placeholder="Add a new todo..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="form-btn">
                    Add
                </button>
            </div>
        </form>
    );
}

export default TodoForm;