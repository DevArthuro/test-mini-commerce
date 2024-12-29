import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Orders } from "../../services/orders";
import { RequestBodyCreateOrder, ResponseCreateOrder } from "../../types/orders";

const initialStore: {
  data: { orderId: string; order: ResponseCreateOrder["data"] | null } | null;
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
  async (body: RequestBodyCreateOrder, { rejectWithValue }) => {
    try {
      const order = await OrdersIntance.createOrder(body);

      if (typeof order === "string") {
        throw new Error(order);
      }
      return order.reference;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message ?? "Error to create order"
      );
    }
  }
);

export const fetchOrderByReference = createAsyncThunk(
  "getOrder/fetch",
  async (id: string, { rejectWithValue }) => {
    try {
      const order = await OrdersIntance.getOrderByReference(id);

      if (typeof order === "string") {
        throw new Error(order);
      }
      return order;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message ?? "Error to get order"
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
        state.data = { orderId: action.payload, order: null };
      })
      .addCase(fetchCreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderByReference.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByReference.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          orderId: state.data?.orderId as string,
          order: action.payload as ResponseCreateOrder["data"],
        };
      })
      .addCase(fetchOrderByReference.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
