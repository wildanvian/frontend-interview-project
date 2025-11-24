/**
 * TodoList Component Tests
 * 
 * This file demonstrates:
 * - Basic rendering tests
 * - User interaction tests (clicking, typing)
 * - State management tests
 * - Edge cases
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList.jsx';

describe('TodoList Component', () => {
  
  // TEST 1: Basic Rendering
  test('renders todo list with heading', () => {
    render(<TodoList />);
    
    // Check if the heading is in the document
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if input field exists
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  // TEST 2: Adding a New Todo
  test('adds a new todo when user types and clicks add button', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find the input and add button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type a todo item
    await user.type(input, 'Buy groceries');
    
    // Click add button
    await user.click(addButton);
    
    // Check if the todo appears in the list
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input).toHaveValue('');
  });

  // TEST 3: Adding Todo with Enter Key
  test('adds todo when user presses Enter key', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Type and press Enter
    await user.type(input, 'Walk the dog{Enter}');
    
    // Todo should be added
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  // TEST 4: Edge Case - Empty Input
  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const addButton = screen.getByTestId('add-button');
    
    // Click add without typing anything
    await user.click(addButton);
    
    // Should show empty message
    expect(screen.getByText('No todos yet!')).toBeInTheDocument();
  });

  // TEST 5: Edge Case - Whitespace Only
  test('does not add todo with only whitespace', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type only spaces
    await user.type(input, '   ');
    await user.click(addButton);
    
    // Should not add the todo
    expect(screen.getByText('No todos yet!')).toBeInTheDocument();
  });

  // TEST 6: Toggle Todo Completion
  test('toggles todo completion when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const initialTodos = [
      { id: 1, text: 'Test todo', completed: false }
    ];
    
    render(<TodoList initialTodos={initialTodos} />);
    
    const checkbox = screen.getByTestId('todo-checkbox-1');
    
    // Initially not checked
    expect(checkbox).not.toBeChecked();
    
    // Click to complete
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Click again to uncomplete
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // TEST 7: Delete Todo
  test('deletes todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    const initialTodos = [
      { id: 1, text: 'Delete me', completed: false }
    ];
    
    render(<TodoList initialTodos={initialTodos} />);
    
    // Todo should exist
    expect(screen.getByText('Delete me')).toBeInTheDocument();
    
    // Click delete button
    const deleteButton = screen.getByTestId('delete-button-1');
    await user.click(deleteButton);
    
    // Todo should be removed
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
    expect(screen.getByText('No todos yet!')).toBeInTheDocument();
  });

  // TEST 8: Filter - Show All Todos
  test('shows all todos when "All" filter is selected', async () => {
    const user = userEvent.setup();
    const initialTodos = [
      { id: 1, text: 'Active todo', completed: false },
      { id: 2, text: 'Completed todo', completed: true }
    ];
    
    render(<TodoList initialTodos={initialTodos} />);
    
    // Both todos should be visible
    expect(screen.getByText('Active todo')).toBeInTheDocument();
    expect(screen.getByText('Completed todo')).toBeInTheDocument();
    
    // Check counter
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (2)');
  });

  // TEST 9: Filter - Show Only Active Todos
  test('shows only active todos when "Active" filter is selected', async () => {
    const user = userEvent.setup();
    const initialTodos = [
      { id: 1, text: 'Active todo', completed: false },
      { id: 2, text: 'Completed todo', completed: true }
    ];
    
    render(<TodoList initialTodos={initialTodos} />);
    
    // Click Active filter
    await user.click(screen.getByTestId('filter-active'));
    
    // Only active todo should be visible
    expect(screen.getByText('Active todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed todo')).not.toBeInTheDocument();
    
    // Check counter
    expect(screen.getByTestId('filter-active')).toHaveTextContent('Active (1)');
  });

  // TEST 10: Filter - Show Only Completed Todos
  test('shows only completed todos when "Completed" filter is selected', async () => {
    const user = userEvent.setup();
    const initialTodos = [
      { id: 1, text: 'Active todo', completed: false },
      { id: 2, text: 'Completed todo', completed: true }
    ];
    
    render(<TodoList initialTodos={initialTodos} />);
    
    // Click Completed filter
    await user.click(screen.getByTestId('filter-completed'));
    
    // Only completed todo should be visible
    expect(screen.queryByText('Active todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed todo')).toBeInTheDocument();
    
    // Check counter
    expect(screen.getByTestId('filter-completed')).toHaveTextContent('Completed (1)');
  });

  // TEST 11: Empty State Messages
  test('shows appropriate empty message for each filter', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // All filter - no todos
    expect(screen.getByText('No todos yet!')).toBeInTheDocument();
    
    // Active filter - no active todos
    await user.click(screen.getByTestId('filter-active'));
    expect(screen.getByText('No active todos.')).toBeInTheDocument();
    
    // Completed filter - no completed todos
    await user.click(screen.getByTestId('filter-completed'));
    expect(screen.getByText('No completed todos.')).toBeInTheDocument();
  });

  // TEST 12: Multiple Todos
  test('handles multiple todos correctly', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add first todo
    await user.type(input, 'First todo');
    await user.click(addButton);
    
    // Add second todo
    await user.type(input, 'Second todo');
    await user.click(addButton);
    
    // Add third todo
    await user.type(input, 'Third todo');
    await user.click(addButton);
    
    // All three should be visible
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
    expect(screen.getByText('Third todo')).toBeInTheDocument();
    
    // Counter should show 3
    expect(screen.getByTestId('filter-all')).toHaveTextContent('All (3)');
  });

  // TEST 13: Accessibility - ARIA Labels
  test('has proper accessibility attributes', () => {
    const initialTodos = [
      { id: 1, text: 'Test todo', completed: false }
    ];
    
    render(<TodoList initialTodos={initialTodos} />);
    
    // Input should have aria-label
    expect(screen.getByLabelText('New todo input')).toBeInTheDocument();
    
    // Filter group should have aria-label
    expect(screen.getByRole('group', { name: 'Filter todos' })).toBeInTheDocument();
    
    // Checkbox should have descriptive aria-label
    expect(screen.getByLabelText('Mark "Test todo" as complete')).toBeInTheDocument();
  });
});
