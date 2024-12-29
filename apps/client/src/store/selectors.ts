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