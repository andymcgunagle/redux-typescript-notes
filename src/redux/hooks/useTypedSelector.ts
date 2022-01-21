import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { store } from '../store';

type RootState = ReturnType<typeof store.getState>;

// Typed react-redux hook to use instead of plain 'useSelector'
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;