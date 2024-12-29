import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/products'
import { Products } from '../../services/products';

const initialStore: { data: Product[]; loading: boolean; error: string; productSelected: { idProduct: string;  quantity: number} | null } = {
	data: [],
	loading: false,
	error: '',
	productSelected: null,
}

const ProductService = new Products()

export const fetchPoducts = createAsyncThunk('products/fetch', async () => {
	const response = await ProductService.getProducts()
	if (typeof response === "string" ) {
		throw new Error("error to fech products")
	}
	return response.data
})

export interface saveProductSelectType {
	idProduct: string;
	quantity: number;
}

export const productSlice = createSlice({
  name: "products",
  initialState: initialStore,
  reducers: {
    saveProductSelected: (
      state,
      action: { payload: saveProductSelectType }
    ) => {
      state.productSelected = {
        idProduct: action.payload.idProduct,
        quantity: action.payload.quantity,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoducts.pending, (state) => {
        state.loading = true;
        state.error = ""
        state.data = []
      })
      .addCase(fetchPoducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.data = action.payload as Product[];
      })
      .addCase(fetchPoducts.rejected, (state) => {
        state.loading = false;
        state.data = []
        state.error = "Has ocurred and error to fetch products";
      });
  },
});

export const { saveProductSelected } = productSlice.actions

export default productSlice.reducer
