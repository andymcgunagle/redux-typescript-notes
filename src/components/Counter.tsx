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