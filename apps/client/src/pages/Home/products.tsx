import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductCard from "./components/productCard";
import ModalBuyProduct from "./components/modalBuyProduct";
import { ContextModalProvider } from "../../context/modalConext";
import { useCallback, useState } from "react";

const ProductsPage = () => {

  const [modalState, setModalState] = useState({
    idProduct: "",
    openModal: false,
    quantity: 0
  })

  const openModal = useCallback((idProduct: string, quantity: number) => {
    setModalState((prev) => ({...prev, idProduct, openModal: true, quantity}))
  }, [])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({...prev, openModal: false, idProduct: '', quantity: 0}))
  }, [])

  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.loading);
  const isError = useSelector((state: RootState) => state.products.error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ContextModalProvider value={{
        ...modalState,
        handlerOpenModal: openModal,
        handlerCloseModal: closeModal
      }}>
        <div>
          {isError ? (
            <p>something is wrong</p>
          ) : (
            <div>
              {products.length > 0 ? (
                products.map((prouct) => (
                  <ProductCard {...prouct} key={prouct.id} />
                ))
              ) : (
                <p>Any products available</p>
              )}
            </div>
          )}
        </div>
        <ModalBuyProduct />
      </ContextModalProvider>
    </div>
  );
};

export default ProductsPage;
