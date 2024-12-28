import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product, ResponseProduct } from '../../types/products'
import axios from 'axios'

const initialStore: { products: Product[]; loading: boolean; error: string } = {
	products: [],
	loading: false,
	error: '',
}

export const fetchPoducts = createAsyncThunk('products/fetch', async () => {
	try {
		const response = await axios.get<ResponseProduct>(
			`${import.meta.env.VITE_BASE_API_URL}/products`
        )
        console.log(response.data)
		return response.data.data
	} catch (error) {
		return (error as Error).message
	}
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
			.addCase(fetchPoducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export default productSlice.reducer
