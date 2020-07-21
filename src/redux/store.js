import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import combinedReducers from "./reducers";
import {saveState, loadState} from './localStorage';

const persisto = loadState();
const middleware = [...getDefaultMiddleware()]

const store = configureStore({
  reducer: combinedReducers,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: persisto,
  enhancers: []
});

store.subscribe(() => {
  saveState({
		userToken: store.getState().userToken,
		cartList: store.getState().cartList
  });
});

export default store;

// Standart createStore from redux

// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });
//
// const store = createStore(
// 	combinedReducers,
// 	persisto,		// preloadedState, this is the magic of the createStore function 
// 	composeEnhancers(
//   	applyMiddleware(thunkMiddleware),
//   	// other store enhancers 
// 	)
// );
