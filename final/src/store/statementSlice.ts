import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Transaction {
  id: number;
  date: string;
  header: string;
  credit: number;
  debit: number;
}

interface StatementState {
  transactions: Transaction[];
}  


const initialState: StatementState = {
  transactions: [],
};

export const statementSlice = createSlice({
  name: 'statement',
  initialState,
  reducers: {
    // Action to add a new transaction
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push({
        id: action.payload.id, // This is just a placeholder. In a real app, you'd want a more robust ID generation strategy.
        date: action.payload.date,
        header: action.payload.header,
        credit: action.payload.credit,
        debit: action.payload.debit,
      });
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);  
        if (index !== -1) { 
            state.transactions[index] = action.payload;
        }
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } = statementSlice.actions;
export default statementSlice.reducer;
