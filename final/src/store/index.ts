import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activitySlice';
import { statementSlice } from './statementSlice';

export const store = configureStore({
  reducer: {
    activity: activityReducer,
    statement: statementSlice.reducer,
    // Add other reducers here as your app grows
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;