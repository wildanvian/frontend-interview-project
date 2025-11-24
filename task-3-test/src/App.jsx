import { useState } from 'react'
import './App.scss'
import TodoList from './components/TodoList'
import UserProfile from './components/UserProfile'

function App() {
  const [selectedUserId, setSelectedUserId] = useState(1)

  return (
    <div className="App">
      <h1>Task 3: Advanced Testing Demo</h1>
      
      <div className="components-grid">
        {/* TodoList Component */}
        <div className="component-card">
          <TodoList />
        </div>

        {/* UserProfile Component */}
        <div className="component-card">
          <div className="user-selector">
            <label htmlFor="userSelect">Select User: </label>
            <select 
              id="userSelect"
              value={selectedUserId} 
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
            >
              <option value="">-- Select a user --</option>
              <option value="1">User 1</option>
              <option value="2">User 2</option>
              <option value="3">User 3</option>
              <option value="4">User 4</option>
              <option value="5">User 5</option>
            </select>
          </div>
          <UserProfile userId={selectedUserId} />
        </div>
      </div>
    </div>
  )
}

export default App
