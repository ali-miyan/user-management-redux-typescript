// store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import  authReducer  from '../reducers/userAuthReducer';
import { api } from '../reducers/adminReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, api.middleware),
  devTools: true,
});

export default store;
