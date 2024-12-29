import { all } from "country-codes-list"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ModalBuyProduct from "./components/modalBuyProduct";
import { ContextModalProvider } from "../../context/modalConext";
import { useCallback, useEffect, useState } from "react";
import "./products.scss"

const ProductsPage = () => {

  const [modalState, setModalState] = useState({
    idProduct: "",
    openModal: true,
    quantity: 0
  })

  const openModal = useCallback((idProduct: string, quantity: number) => {
    setModalState((prev) => ({...prev, idProduct, openModal: true, quantity}))
  }, [])

  const closeModal = useCallback(() => {
    setModalState((prev) => ({...prev, openModal: false, idProduct: '', quantity: 0}))
  }, [])

  const isLoading = useSelector((state: RootState) => state.products.loading);

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
        {/* <div>
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
        </div> */}
        <ModalBuyProduct />
      </ContextModalProvider>
    </div>
  );
};

export default ProductsPage;
