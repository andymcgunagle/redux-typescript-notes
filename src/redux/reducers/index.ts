import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { todosReducer } from "./todosReducer";

export default combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});