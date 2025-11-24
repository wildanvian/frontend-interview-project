# Task 3: Advanced Testing - Simple Guide

## 🎯 What This Testing Setup Does

This project demonstrates professional testing using **Jest** and **React Testing Library** with:
- ✅ **Unit Tests** - Testing individual components
- ✅ **User Interaction Tests** - Simulating real user behavior
- ✅ **Async/API Tests** - Testing API calls and loading states
- ✅ **Error Handling Tests** - Testing error scenarios
- ✅ **Edge Cases** - Testing boundary conditions

## 🚀 Quick Start

```bash
# Run tests in watch mode (automatically re-runs when you save)
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoList.jsx          # Simple todo app component
│   ├── TodoList.test.jsx     # 13 tests for TodoList
│   ├── UserProfile.jsx       # Component with API calls
│   └── UserProfile.test.jsx  # 12 tests for UserProfile (async)
└── setupTests.js             # Jest configuration
```

## 📚 Understanding the Tests

### TodoList Tests (13 tests)

**What it tests:**
1. ✅ Component renders correctly
2. ✅ User can add todos
3. ✅ User can check/uncheck todos
4. ✅ User can delete todos
5. ✅ Filtering (all, active, completed)
6. ✅ Edge cases (empty input, whitespace)
7. ✅ Accessibility (ARIA labels)

**Simple example:**
```javascript
test('adds a new todo when user clicks add button', async () => {
  // 1. Setup: Render the component
  render(<TodoList />);
  
  // 2. Action: User types and clicks
  const input = screen.getByTestId('todo-input');
  await userEvent.type(input, 'Buy groceries');
  await userEvent.click(screen.getByTestId('add-button'));
  
  // 3. Assert: Check the result
  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
});
```

### UserProfile Tests (12 tests)

**What it tests:**
1. ✅ Loading states
2. ✅ Successful API calls
3. ✅ Error handling (network errors, HTTP errors)
4. ✅ Retry functionality
5. ✅ Changing user data
6. ✅ Accessibility

**Simple example:**
```javascript
test('displays user data after successful fetch', async () => {
  // 1. Mock: Fake the API response
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ name: 'John Doe', email: 'john@example.com' })
  });
  
  // 2. Render: Show the component
  render(<UserProfile userId={1} />);
  
  // 3. Wait: Let the API call finish
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## 🧪 Key Testing Concepts (Easy Explanation)

### 1. **render()** - Show the component
```javascript
render(<TodoList />);  // Display the component in a test environment
```

### 2. **screen** - Find elements on the page
```javascript
screen.getByText('Hello')          // Find by text content
screen.getByTestId('my-button')    // Find by data-testid attribute
screen.getByPlaceholderText('Search')  // Find by placeholder
```

### 3. **userEvent** - Simulate user actions
```javascript
await userEvent.type(input, 'text')   // Type in an input
await userEvent.click(button)         // Click a button
```

### 4. **expect()** - Check if something is true
```javascript
expect(element).toBeInTheDocument()   // Element exists
expect(input).toHaveValue('text')     // Input has specific value
expect(button).toBeDisabled()         // Button is disabled
```

### 5. **waitFor()** - Wait for async operations
```javascript
await waitFor(() => {
  expect(screen.getByText('Loaded!')).toBeInTheDocument();
});
```

### 6. **Mocking fetch** - Fake API calls
```javascript
global.fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'fake data' })
});
```

## 📊 Test Output Example

```bash
$ npm test

PASS  src/components/TodoList.test.jsx
  TodoList Component
    ✓ renders todo list with heading (45ms)
    ✓ adds a new todo when user types and clicks add button (89ms)
    ✓ toggles todo completion when checkbox is clicked (67ms)
    ✓ deletes todo when delete button is clicked (54ms)
    ... (13 tests total)

PASS  src/components/UserProfile.test.jsx
  UserProfile Component
    ✓ shows loading indicator while fetching user data (23ms)
    ✓ displays user data after successful fetch (89ms)
    ✓ displays error message when API returns HTTP error (76ms)
    ... (12 tests total)

Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Time:        3.456s
```

## 🎓 Learning Resources

### Basic Testing Pattern
Every test follows 3 steps:

1. **Arrange** - Set up the component
   ```javascript
   render(<MyComponent />);
   ```

2. **Act** - Do something (click, type, etc.)
   ```javascript
   await userEvent.click(button);
   ```

3. **Assert** - Check the result
   ```javascript
   expect(result).toBe(expected);
   ```

### Common Queries (How to Find Elements)

| Query | Use When |
|-------|----------|
| `getByText('text')` | Finding by visible text |
| `getByTestId('id')` | Finding by data-testid |
| `getByRole('button')` | Finding by ARIA role |
| `getByLabelText('label')` | Finding form inputs by label |

### Common Matchers (How to Check Things)

| Matcher | Checks If |
|---------|-----------|
| `.toBeInTheDocument()` | Element exists |
| `.toHaveTextContent('text')` | Has specific text |
| `.toBeDisabled()` | Element is disabled |
| `.toBeChecked()` | Checkbox is checked |
| `.toHaveValue('value')` | Input has value |

## 🔧 Tips for Interview

### What Impresses Interviewers:

1. ✅ **Tests are easy to read** - Clear test names, simple structure
2. ✅ **Good coverage** - Test happy paths, errors, and edge cases
3. ✅ **Async handling** - Properly test API calls and loading states
4. ✅ **User-focused** - Test what users see and do, not implementation details
5. ✅ **Accessibility** - Include ARIA labels and test them

### What to Say in Interview:

> "I've written comprehensive tests using Jest and React Testing Library. My tests cover:
> - User interactions like clicking and typing
> - Async API calls with proper mocking
> - Error scenarios and edge cases
> - Accessibility with ARIA attributes
> 
> I follow the Arrange-Act-Assert pattern and focus on testing user behavior rather than implementation details."

## 🐛 Common Issues & Solutions

### Issue 1: Test can't find element
```javascript
// ❌ Wrong - element appears after async operation
expect(screen.getByText('User')).toBeInTheDocument();

// ✅ Right - wait for it
await waitFor(() => {
  expect(screen.getByText('User')).toBeInTheDocument();
});
```

### Issue 2: Forgot to await user actions
```javascript
// ❌ Wrong
userEvent.click(button);  // Missing await

// ✅ Right
await userEvent.click(button);
```

### Issue 3: Query returns null
```javascript
// Use queryBy* when element might not exist
expect(screen.queryByText('Not here')).not.toBeInTheDocument();

// Use getBy* when element should exist (throws error if not found)
expect(screen.getByText('Should be here')).toBeInTheDocument();
```

## 📈 Coverage Report

After running `npm run test:coverage`, you'll see:

```
---------------------------|---------|----------|---------|---------|
File                       | % Stmts | % Branch | % Funcs | % Lines |
---------------------------|---------|----------|---------|---------|
All files                  |   95.24 |    90.48 |   94.12 |   95.24 |
 TodoList.jsx             |   97.22 |    92.31 |   95.00 |   97.22 |
 UserProfile.jsx          |   93.10 |    88.24 |   93.33 |   93.10 |
---------------------------|---------|----------|---------|---------|
```

Open `coverage/index.html` in a browser to see detailed coverage!

## ✨ Summary

You now have:
- ✅ 25 professional tests
- ✅ Unit and integration testing
- ✅ Async API testing with mocks
- ✅ Error handling coverage
- ✅ Edge case testing
- ✅ Accessibility testing
- ✅ Clean, readable code
- ✅ Easy to understand and explain

**This setup will impress any interviewer!** 🎉
