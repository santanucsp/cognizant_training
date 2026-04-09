import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./CustomerSlice";
import accountReducer from "./AccountSlice";
import statementReducer from "./StatementSlice";

export const AppStore = configureStore({
  reducer: {
    customers: customerReducer,
    accounts: accountReducer,
    statement: statementReducer
  }
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;