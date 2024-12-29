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

export const fetchCreateOrder = createAsyncThunk(
  "createOrder/fetch",
  async (body: RequestBodyCreateOrder, {rejectWithValue}) => {
    try {
      const order = await OrdersIntance.createOrder(body);

      if (typeof order === "string") {
        throw new Error(order);
      }
      return order;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message ?? "Error to create order"
      );
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: initialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as Pick<ResponseCreateOrder, "data">;
      })
        .addCase(fetchCreateOrder.rejected, (state, action) => {
          console.log(action.payload)
        state.loading = false;
        state.data = null;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
