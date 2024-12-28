import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/products'
import { Products } from '../../services/products';

const initialStore: { products: Product[]; loading: boolean; error: string } = {
	products: [],
	loading: false,
	error: '',
}

const ProductService = new Products()

export const fetchPoducts = createAsyncThunk('products/fetch', async () => {
	const response = await ProductService.getProducts()
	if (typeof response === "string" ) {
		throw new Error("error to fech products")
	}
	return response.data
})

export const productSlice = createSlice({
	name: 'products',
	initialState: initialStore,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPoducts.pending, (state) => {
				state.loading = true
			})
            .addCase(fetchPoducts.fulfilled, (state, action) => {
				state.loading = false
				state.products = action.payload as Product[]
			})
			.addCase(fetchPoducts.rejected, (state) => {
				state.loading = false
				state.error = "Has ocurred and error to fetch products" 
			})
	},
})

export default productSlice.reducer
