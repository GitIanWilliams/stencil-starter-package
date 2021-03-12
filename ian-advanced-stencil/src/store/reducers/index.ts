import { combineReducers } from 'redux';
import { Store, createStore } from 'redux';

// Import feature reducers and state interfaces.
import { MyState, myState } from './mystate';

// This interface represents app state by nesting feature states.
export interface RootState {
  myState: MyState;
}

// Combine feature reducers into a single root reducer
const rootReducer = combineReducers({
  myState
});

export const myStore: Store<RootState> = createStore(rootReducer);