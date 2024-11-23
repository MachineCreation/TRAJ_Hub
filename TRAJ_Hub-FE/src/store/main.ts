// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './user';

const store = configureStore({
  reducer: {
    user: usernameReducer, // Add the reducer to the store
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
