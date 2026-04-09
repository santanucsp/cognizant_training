import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer } from "../models/Customer";
import data from "../data/customer.json";

interface CustomerState {
  customers: Customer[];
  selectedCRIN?: number;
}

const initialState: CustomerState = {
  customers: data.customers,
  selectedCRIN: undefined
};

const CustomerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setSelectedCRIN: (state, action: PayloadAction<number>) => {
      state.selectedCRIN = action.payload;
    },

    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    }
  }
});

export const { setSelectedCRIN, addCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;
