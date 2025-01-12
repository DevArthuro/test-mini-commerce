import { modalContext } from "../context/modalConext";
import { Product, ProductOrder } from "../types/products";
import { FEE_BOUGHT, FEE_DELIVERY } from "./fee";

export interface ProductsFormatOrder {
  products: ProductOrder[];
  totalProducts: number;
  totalFeeBought: number;
  totalFeeDelivery: number;
  totalAmount: number;
}

export const getProductFormatCalculate = (
  products: Product[],
  productsCart: modalContext["products"]
): ProductsFormatOrder => {
  const productsFiltered = Object.entries(productsCart).map(
    ([id, value]): ProductOrder => {
      const product = products.find((product) => product.id === id)!;
      const totalPrice = product.price * value.quantity;

      return {
        ...product,
        total: totalPrice,
        quantity: value.quantity,
      };
    }
  );

  const totalProducts = productsFiltered.reduce(
    (calculate, product) => product.total + calculate,
    0
  );

  const totalFeeBought = totalProducts * FEE_BOUGHT;
  const totalFeeDelivery = totalProducts * FEE_DELIVERY;

  return {
    products: productsFiltered,
    totalProducts,
    totalFeeBought,
    totalFeeDelivery,
    totalAmount: totalProducts + totalFeeBought + totalFeeDelivery,
  };
};
