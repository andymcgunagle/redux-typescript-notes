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