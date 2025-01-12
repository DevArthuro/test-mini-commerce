export interface Product {
    id: string
    name: string
    description: string
    stock: number
    price: number
    imageUrl: string
}

export interface ResponseProduct {
	data: Product[]
	status: number
	error: boolean
}

export type ProductOrder = {
    total: number;
    quantity: number
} & Product