# Redux with TypeScript

1. ## Install Packages

`npm i redux react-redux @types/react-redux`

2. ## Create Reducers

- In the following examples, `as State` isn't strictly necessary. Also, there might be a better way to create the parameter interfaces for these reducers - this just seemed to make sense and worked. 

### /src/redux/reducers/counterReducer.ts 

```TypeScript
import { Action } from "redux";

export function counterReducer(state: State = { value: 0 }, action: CounterAction) {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + 1 } as State;
    case 'counter/decrement':
      return { value: state.value - 1 } as State;
    default:
      return state;
  };
};

interface State {
  value: number,
};

interface CounterAction extends Action {
  type: 'counter/increment' | 'counter/decrement',
};
```

### /src/redux/reducers/todosReducer.ts

```TypeScript
import { Action } from 'redux';

export function todosReducer(state: State = { list: [] }, action: TodoAction) {
  switch (action.type) {
    case 'todos/add':
      return { list: [...state.list, action.payload] } as State;
    default:
      return state;
  };
};

interface State {
  list: string[],
};

interface TodoAction extends Action {
  type: 'todos/add',
  payload: string,
};
```

3. ## Combine Reducers

- Note that you'll typically see reducers as default exports and written using key-value shorthand syntax (`counter` rather than `counter: counterReducer`, for example) - I used named exports here for added clarity.

### /src/redux/reducers/index.ts

```TypeScript
import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { todosReducer } from "./todosReducer";

export default combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});
```

4. ## Create Store

- Note that you can name `rootReducer` whatever you'd like - it's just the default export `combineReducers` being passed into `createStore`.

### /src/redux/store.ts

```TypeScript
import { createStore } from 'redux';
import rootReducer from './reducers/index';

export const store = createStore(rootReducer);
```

5. ## Wrap App in Provider

```TypeScript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

6. ## Create Typed react-redux Hooks

- Typed react-redux hooks to use instead of plain `useSelector` and `useDispatch`.

- Creating an `index.ts` file in this directory and exporting these hooks from there isn't necessary - it just makes it simpler to import them from a single file in components.

### /src/redux/hooks/useTypedSelector.ts

```TypeScript
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### /src/redux/hooks/useTypedDispatch.ts

```TypeScript
import { useDispatch } from "react-redux";
import { store } from '../store';

type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
```

### /src/redux/hooks/index.ts

```TypeScript
export * from './useTypedDispatch';
export * from './useTypedSelector';
```

7. ## Use Typed react-redux Hooks in Components

- Usage in components is simple - get the state you need from your `store` using your `useTypedSelector` hook, then dispatch action objects with a `type` and, when necessary, a `payload` using your `useTypedDispatch` hook.

### /src/components/Counter.tsx

```TypeScript
import { useTypedDispatch, useTypedSelector } from "../redux/hooks";

export default function Counter() {
  const dispatch = useTypedDispatch();
  const count = useTypedSelector(state => state.counter.value);

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={() => dispatch({ type: 'counter/decrement' })}>
        -
      </button>
      {count}
      <button onClick={() => dispatch({ type: 'counter/increment' })}>
        +
      </button>
    </div>
  );
};
```

### /src/components/Todos.tsx

```TypeScript
import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux/hooks";

export default function Todos() {
  const [newTodo, setNewTodo] = useState('');

  const dispatch = useTypedDispatch();
  const todos = useTypedSelector(state => state.todos.list);

  const submitTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'todos/add', payload: newTodo });
    setNewTodo('');
  };

  return (
    <div>
      <form onSubmit={submitTodo}>
        <input
          onChange={e => setNewTodo(e.target.value)}
          type="text"
          value={newTodo}
          placeholder="Add new todo..."
        />
      </form>

      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => <p key={index}>{todo}</p>)}
      </div>
    </div>
  );
};
```
