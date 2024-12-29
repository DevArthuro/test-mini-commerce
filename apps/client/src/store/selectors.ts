import { RootState } from "./store";

/** Products */
export const productsData = (state: RootState) => state.products.data;
export const productsLoading = (state: RootState) => state.products.loading;
export const productsError = (state: RootState) => state.products.error;

/** Orders */
export const ordersData = (state: RootState) => state.orders.data;
export const ordersLoading = (state: RootState) => state.orders.loading;
export const ordersError = (state: RootState) => state.orders.error;
export const orderDataIdOrder = (state: RootState) => state.orders.data?.orderId;
export const orderDataById = (state: RootState) => state.orders.data?.order;

/** Transactions */
export const transactionData = (state: RootState) => state.transactions.data?.transaction;
export const transactionId = (state: RootState) =>
  state.transactions.data?.transactionId;
export const transactionIsLoading = (state: RootState) =>
  state.transactions.loading;
export const transactionError = (state: RootState) => state.transactions.error;
