import { useDispatch } from "react-redux";
import { store } from '../store';

type AppDispatch = typeof store.dispatch;

// Typed react-redux hook to use instead of plain 'useDispatch'
export const useTypedDispatch = () => useDispatch<AppDispatch>();