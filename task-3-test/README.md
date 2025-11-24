# Interview Project - Task 3: Advanced Testing ✅

## Quick Start

```bash
# Run tests (watch mode - auto-reruns when you save)
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

## ✨ What's Included

### 2 Components with 25 Professional Tests

1. **TodoList** (13 tests)
   - ✅ Add/delete/toggle todos
   - ✅ Filter todos (all/active/completed)
   - ✅ Edge cases (empty input, whitespace)
   - ✅ Accessibility (ARIA labels)

2. **UserProfile** (12 tests)
   - ✅ Async API calls with fetch
   - ✅ Loading states
   - ✅ Error handling (network errors, HTTP errors)
   - ✅ Retry functionality
   - ✅ Mocked API responses

## 📚 Documentation

**Read [TESTING_GUIDE.md](./TESTING_GUIDE.md)** for:
- Step-by-step explanation of each test
- How Jest & React Testing Library work
- Common patterns and examples
- Tips for the interview

## 🎯 Task 3 Requirements Met

✅ **Comprehensive unit tests** - 25 tests covering all functionality  
✅ **Integration tests** - Components work together correctly  
✅ **Edge cases** - Empty inputs, whitespace, boundary conditions  
✅ **Asynchronous behavior** - API calls, loading states, promises  
✅ **Error handling** - Network errors, HTTP errors, retry logic  
✅ **Testing framework** - Jest + React Testing Library  
✅ **Clear documentation** - Easy to understand guide included

## 📊 Test Results

```bash
PASS src/components/UserProfile.test.jsx
PASS src/components/TodoList.test.jsx

Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Time:        4.423s
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TodoList.jsx              # Todo app component
│   ├── TodoList.test.jsx         # 13 tests
│   ├── UserProfile.jsx           # API component
│   └── UserProfile.test.jsx      # 12 tests (async)
├── setupTests.js                 # Jest configuration
└── App.jsx                       # Main app

Configuration:
├── jest.config.js                # Jest settings
├── babel.config.json             # Babel for JSX
└── package.json                  # Scripts & dependencies
```

## 🧪 Testing Technologies

- **Jest** - Test runner and assertion library
- **React Testing Library** - Test React components
- **@testing-library/user-event** - Simulate user interactions
- **@testing-library/jest-dom** - Custom matchers

## 💡 Key Features

### Simple & Easy to Understand
- Clear test names describe what's being tested
- Well-commented code explains each step
- Follows Arrange-Act-Assert pattern

### Professional Quality
- Mocked API calls with Jest
- Async testing with `waitFor()`
- Accessibility testing with ARIA
- Edge case coverage

### Interview-Ready
- Demonstrates best practices
- Easy to explain and discuss
- Shows understanding of testing concepts

## 📖 Quick Test Example

```javascript
test('adds a new todo when user clicks add button', async () => {
  // 1. Arrange - Setup
  render(<TodoList />);
  
  // 2. Act - Do something
  const input = screen.getByTestId('todo-input');
  await userEvent.type(input, 'Buy groceries');
  await userEvent.click(screen.getByTestId('add-button'));
  
  // 3. Assert - Check result
  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
});
```

## 🎓 Learn More

See **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** for:
- Detailed explanation of every test
- Testing concepts in simple terms
- Common patterns and best practices
- How to talk about it in the interview

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Technologies

- React 19.2
- Vite 7.2
- Jest 30.2
- React Testing Library 16.3

---

**Made with ❤️ for interview success!**
