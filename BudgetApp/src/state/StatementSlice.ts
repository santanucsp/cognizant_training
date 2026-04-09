import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Txn } from "../models/Txn";
import type { TxnsSummary } from "../models/TxnsSummary";

interface StatementState {
    txns: Txn[];
    summary: TxnsSummary;
    nextId: number;
}

const initialState: StatementState = {
    txns: [],
    summary: {
        totalCredit: 0,
        totalDebit: 0,
        balance: 0
    },
    nextId: 1
};

const StatementSlice = createSlice({
    name: "StatementSlice",
    initialState,
    reducers: {

        addTxn: (state, action: PayloadAction<Txn>) => {
            action.payload.id = state.nextId;
            state.txns.push(action.payload);
            state.nextId++;
            if (action.payload.txnType === "CREDIT") {
                state.summary.totalCredit += action.payload.amount;
            } else if (action.payload.txnType === "DEBIT") {
                state.summary.totalDebit += action.payload.amount;
            }
            state.summary.balance = state.summary.totalCredit - state.summary.totalDebit;
        },

        updateTxn: (state, action: PayloadAction<Txn>) => {
            let index = state.txns.findIndex(cx => cx.id === action.payload.id);
            if (index > -1) {
                if (state.txns [index].txnType === "CREDIT") {
                    state.summary.totalCredit -= state.txns[index].amount;
                } else if (state.txns [index].txnType === "DEBIT") {
                    state.summary.totalDebit -= state.txns [index].amount;
                }
                action.payload.isEditable=undefined;
                state.txns[index] = action.payload;
                if (action.payload.txnType === "CREDIT") {
                    state.summary.totalCredit += action.payload.amount;
                } else if (action.payload.txnType === "DEBIT") {
                    state.summary.totalDebit += action.payload.amount;
                }
                state.summary.balance = state.summary.totalCredit - state.summary.totalDebit;
            }
        },

        deleteTxn: (state, action: PayloadAction<Number>) => {
            let index = state.txns.findIndex(tx => tx.id === action.payload);
            if (index > -1) {
                if (state.txns[index].txnType === "CREDIT") {
                    state.summary.totalCredit -= state.txns[index].amount;
                } else if (state.txns[index].txnType === "DEBIT") {
                    state.summary.totalDebit -= state.txns [index].amount;
                }
                state.txns.splice(index, 1);
                state.summary.balance = state.summary.totalCredit - state.summary.totalDebit;
            }
        },

        editTxn: (state, action: PayloadAction<Number>) => {
            let index = state.txns.findIndex(tx => tx.id === action.payload);
            if (index > -1) {
                state.txns[index].isEditable=true;
            }
        },

        unEditTxn: (state, action: PayloadAction<Number>) => {
            let index = state.txns.findIndex (tx => tx.id === action.payload);
            if (index > -1) {
                state.txns [index].isEditable=undefined;
            }
        },

    }
});

const StatementReducer = StatementSlice.reducer;

export const { addTxn, updateTxn, deleteTxn, editTxn, unEditTxn } = StatementSlice.actions;
export default StatementReducer;