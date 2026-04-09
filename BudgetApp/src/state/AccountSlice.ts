import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "../models/Account";
import data from "../data/customer.json";

interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: data.accounts
};

const AccountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    }
  }
});

export const { addAccount } = AccountSlice.actions;
export default AccountSlice.reducer;