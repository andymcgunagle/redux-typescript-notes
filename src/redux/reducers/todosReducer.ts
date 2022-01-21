import { Action } from 'redux'

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
