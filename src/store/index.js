import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import articleReducer from './articleReducer';
import articlesReducer from './articlesReducer';
const reducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
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
