import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import articlesReducer from './articlesReducer';
const reducer = combineReducers({
  articles: articlesReducer,
});

const store = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  },
  applyMiddleware(thunk)
);

export default store;
