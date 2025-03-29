// types.ts
export interface TransactionMetadata {
  name?: string;
  type?: string;
  email?: string;
  quantity?: number;
  country?: string;
  [key: string]: unknown;
}

export interface Transaction {
  amount: number;
  date: string;
  metadata: TransactionMetadata;
  payment_reference: string;
  status: string;
  type: string;
}
