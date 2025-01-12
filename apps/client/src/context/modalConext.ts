import { createContext } from "react";

export interface modalContext {
  openModal: boolean;
  products: ProductBuy;
  handlerOpenModal: (idProduct: string, quantity: number) => void;
  handlerCloseModal: () => void;
}

export type ProductBuy = Record<string, { quantity: number }>;

export const contextModalState = createContext<modalContext>({
  openModal: false,
  products: {},
  handlerOpenModal: () => {},
  handlerCloseModal: () => {},
});

export const ContextModalProvider = contextModalState.Provider;
