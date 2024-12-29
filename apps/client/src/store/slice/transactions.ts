import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Paymenets } from "../../services/payments";
import {
  RequestBodyCreatePayment,
  ResponseCreatePayment,
} from "../../types/payments";

const initialStore: {
    data: { transactionId: string | null;  transaction: ResponseCreatePayment["data"]} | null;
  loading: boolean;
  error: string;
} = {
  data: null,
  loading: false,
  error: "",
};

const PaymentsIntance = new Paymenets();

export const fetchCreateTransaction = createAsyncThunk(
  "createTransaction/fetch",
  async (body: RequestBodyCreatePayment, { rejectWithValue }) => {
    try {
      const transaction = await PaymentsIntance.createTransaction(body);

      if (typeof transaction === "string") {
        throw new Error(transaction);
      }
      return transaction;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message ?? "Error to create order"
      );
    }
  }
);

export const fetchtransactionById = createAsyncThunk(
  "getTransaction/fetch",
  async (id: string, { rejectWithValue }) => {
    try {
      const transaction = await PaymentsIntance.getTransactionById(id);

      if (typeof transaction === "string") {
        throw new Error(transaction);
      }
      return transaction;
    } catch (error) {
      return rejectWithValue((error as Error).message ?? "Error to get order");
    }
  }
);

export const transactionSlice = createSlice({
  name: "order",
  initialState: initialStore,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateTransaction.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCreateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = { transactionId: action.payload.id, transaction: action.payload};
      })
      .addCase(fetchCreateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchtransactionById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchtransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = {
          transactionId: action.payload.id,
          transaction: action.payload,
        };
      })
      .addCase(fetchtransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
