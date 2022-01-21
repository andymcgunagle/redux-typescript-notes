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