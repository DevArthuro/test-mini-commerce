import { createContext } from "react";

export interface modalContext {
  openModal: boolean;
  products: ProductBuy;
  handlerOpenModal: (idProduct: string, quantity: number) => void;
  handlerCloseModal: () => void;
  addProductCart: (productId: string, quantity: number) => void;
  deleteProductCart: (productId: string) => void;
}

export type ProductBuy = Record<string, { quantity: number }>;

export const contextModalState = createContext<modalContext>({
  openModal: false,
  products: {},
  handlerOpenModal: () => {},
  handlerCloseModal: () => {},
  addProductCart: () => {},
  deleteProductCart: () => {}
});

export const ContextModalProvider = contextModalState.Provider;
