# Task 3: Testing Setup Summary

## Overview

### **25 Professional Tests** across 2 components
- **TodoList**: 13 tests covering all features
- **UserProfile**: 12 tests covering async API calls

### **98% Code Coverage**
```
File              | % Stmts | % Branch | % Funcs | % Lines 
------------------|---------|----------|---------|----------
TodoList.jsx      |   97.05 |       96 |   94.11 |   96.55
UserProfile.jsx   |     100 |      100 |     100 |     100
```

## 📦 What's Included

### Components (src/components/)
1. **TodoList.jsx** - Todo app with add/delete/filter
2. **UserProfile.jsx** - Fetches user data from API

### Tests (fully commented!)
1. **TodoList.test.jsx** - 13 tests
   - Adding todos
   - Deleting todos  
   - Toggling completion
   - Filtering (all/active/completed)
   - Edge cases (empty input, whitespace)
   - Accessibility

2. **UserProfile.test.jsx** - 12 tests
   - Async API calls
   - Loading states
   - Error handling
   - Retry functionality
   - Mocked fetch requests

### Documentation
- **README.md** - Project overview
- **TESTING_GUIDE.md** - Step-by-step guide with explanations

## 🚀 How to Use

```bash
# Run tests (watch mode)
npm test

# Run tests once
npm run test:run

# Get coverage report
npm run test:coverage
```

## 📚 Test Examples

### Simple Test (TodoList)
```javascript
test('adds a new todo when user clicks add button', async () => {
  render(<TodoList />);
  
  const input = screen.getByTestId('todo-input');
  await userEvent.type(input, 'Buy groceries');
  await userEvent.click(screen.getByTestId('add-button'));
  
  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
});
```

### Async Test (UserProfile)
```javascript
test('displays user data after successful fetch', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ name: 'John Doe', email: 'john@example.com' })
  });
  
  render(<UserProfile userId={1} />);
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## 📊 Full Test List

### TodoList (13 tests)
1. ✅ Renders with heading
2. ✅ Adds todo on button click
3. ✅ Adds todo on Enter key
4. ✅ Doesn't add empty todo
5. ✅ Doesn't add whitespace-only todo
6. ✅ Toggles todo completion
7. ✅ Deletes todo
8. ✅ Shows all todos
9. ✅ Filters active todos
10. ✅ Filters completed todos
11. ✅ Shows correct empty messages
12. ✅ Handles multiple todos
13. ✅ Has proper accessibility

### UserProfile (12 tests)
1. ✅ Shows "no user" when no userId
2. ✅ Shows loading state
3. ✅ Displays user data on success
4. ✅ Shows error on HTTP error
5. ✅ Shows error on network failure
6. ✅ Retry button works
7. ✅ Updates when userId changes
8. ✅ Handles user without company
9. ✅ Loading has accessibility
10. ✅ Error has accessibility
11. ✅ Calls correct API endpoint
12. ✅ Handles rapid userId changes
