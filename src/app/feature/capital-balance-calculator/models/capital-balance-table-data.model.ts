export type CapitalBalanceDataModel = {
  [key in keyof PropertyTypes | string]: number;
};

export type CapitalBalanceTableDataModel = {
  [key in keyof PropertyTypes | string]: number[];
};

export type PropertyTypes = {
  startBalance: number;
  contributions: number;
  earnings: number;
  fees: number;
  tax: number;
  withdrawals: number;
  endBalance: number;
  year: number;
  age: number;
};
