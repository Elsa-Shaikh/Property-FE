export type PropertyRow = {
  id: number;
  name: string;
  rent_per_month: number;
  commission_percentage: number;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  landlord_id?: number;
  tenant_id?: number;
  user?: User;
  transactions?: Transaction[];
};

export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface Transaction {
  id: number;
  property_id: number;
  type: "CREDIT" | "DEBIT";
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
  property?: PropertyRow;
}

export type PropertyBody = {
  name: string;
  rent_per_month: number;
  commission_percentage: number;
};

export type TransactionBody = {
  type: string;
  amount: number;
  property_id: number;
  description: string;
};
