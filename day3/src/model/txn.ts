export interface FormElements {
  id: HTMLInputElement;
  date: HTMLInputElement;
  description: HTMLInputElement;
  credit: HTMLInputElement;
  debit: HTMLInputElement;
  addBtn: HTMLButtonElement;
}

export interface DataItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  balance?: number;
  type: 'credit' | 'debit';
}
