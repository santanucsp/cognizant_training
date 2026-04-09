export interface Txn {
    id: number;
    accNum: number;
    header: string;
    txnDate: string;
    txnType: "CREDIT" | "DEBIT";
    amount: number;
    isEditable?: boolean;
}