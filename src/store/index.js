import { configureStore } from '@reduxjs/toolkit';
import { attachAuthToken } from '../api';
import authReducer from './auth.store';
import newsReducer from './news.store';

const persistanceMiddleware = (store) => {
  return (next) => {
      return (action) => {
          const result = next(action)
          return result
      }
  }
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat([persistanceMiddleware]),
    devTools: process.env.REACT_APP_NODE_ENV !== "production",
  reducer: {
    auth: authReducer,
    news: newsReducer
  },
});
