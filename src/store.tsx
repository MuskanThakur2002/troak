import { combineReducers, applyMiddleware, createStore, Store } from 'redux';
import homePageReducer from './reducers/homePageReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Middleware } from 'redux';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
  homePage: homePageReducer,
});

const initialState = {};

const middle_wear: Middleware[] = [thunk];

// Define the type of your store state
export type RootState = ReturnType<typeof reducer>;

const store: Store<RootState> = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middle_wear))
);

export default store;
