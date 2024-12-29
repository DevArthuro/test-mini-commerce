import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Orders } from "../../services/orders";
import {
  RequestBodyCreateOrder,
  ResponseCreateOrder,
} from "../../types/orders";

const initialStore: {
  data: Pick<ResponseCreateOrder, "data"> | null;
  loading: boolean;
  error: string;
} = {
  data: null,
  loading: false,
  error: "",
};

const OrdersIntance = new Orders();

export const createOrder = createAsyncThunk(
  "createOrder/fetch",
  async (body: RequestBodyCreateOrder) => {
    const order = await OrdersIntance.createOrder(body);
    if (typeof order === "string") {
      throw new Error(order);
    }
    return order;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: initialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.data = null;
        state.error = "Has ocurred and error to fetch products";
      });
  },
});

export default orderSlice.reducer;
