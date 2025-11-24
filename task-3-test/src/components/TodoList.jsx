import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TodoList Component - Demonstrates state management and user interactions
 */
const TodoList = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="todo-list" data-testid="todo-list">
      <h2>Todo List</h2>
      
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          aria-label="New todo input"
          data-testid="todo-input"
        />
        <button onClick={addTodo} data-testid="add-button">
          Add
        </button>
      </div>

      <div className="filters" role="group" aria-label="Filter todos">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
          data-testid="filter-all"
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
          data-testid="filter-active"
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
          data-testid="filter-completed"
        >
          Completed ({completedCount})
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p data-testid="empty-message">
          {filter === 'all' ? 'No todos yet!' : `No ${filter} todos.`}
        </p>
      ) : (
        <ul data-testid="todo-items">
          {filteredTodos.map(todo => (
            <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete "${todo.text}"`}
                data-testid={`delete-button-${todo.id}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

TodoList.propTypes = {
  initialTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
};

export default TodoList;
