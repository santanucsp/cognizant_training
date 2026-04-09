export interface Account {
    accNum: number;
    type: "Savings" | "Current";
    balance: number;
    CRIN: number;
}