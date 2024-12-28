import { createContext } from "react";

export interface modalContext {
    openModal: boolean;
    idProduct: string;
    quantity: number;
    handlerOpenModal: (idProduct: string, quantity: number) => void;
    handlerCloseModal: () => void;
}

export const contextModalState = createContext<modalContext>({
  openModal: false,
  idProduct: "",
  quantity: 0,
  handlerOpenModal: () => {},
  handlerCloseModal: () => {},
});

export const ContextModalProvider = contextModalState.Provider;
