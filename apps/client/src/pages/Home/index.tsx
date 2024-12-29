import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductCard from "./components/productCard";
import ModalBuyProduct from "./components/modalBuyProduct";
import { ContextModalProvider } from "../../context/modalConext";
import { useCallback, useEffect, useState } from "react";
import "./products.scss";
import { orderDataIdOrder } from "../../store/selectors";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [modalState, setModalState] = useState({
    idProduct: "",
    openModal: false,
    quantity: 0,
  });
  const orderId = useSelector(orderDataIdOrder);
  const products = useSelector((state: RootState) => state.products.data);
  const isError = useSelector((state: RootState) => state.products.error);

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      navigate("/summary");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const openModal = useCallback((idProduct: string, quantity: number) => {
    setModalState((prev) => ({
      ...prev,
      idProduct,
      openModal: true,
      quantity,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      openModal: false,
      idProduct: "",
      quantity: 0,
    }));
  }, []);

  return (
    <div className="products">
      <ContextModalProvider
        value={{
          ...modalState,
          handlerOpenModal: openModal,
          handlerCloseModal: closeModal,
        }}
      >
        <div>
          {isError ? (
            <p className="products__error">Something went wrong</p>
          ) : (
            <div>
              {products.length > 0 ? (
                <div className="products__grid">
                  {products.map((product) => (
                    <ProductCard {...product} key={product.id} />
                  ))}
                </div>
              ) : (
                <p className="products__no-products">Any products available</p>
              )}
            </div>
          )}
        </div>
        {modalState.openModal && <ModalBuyProduct />}
      </ContextModalProvider>
    </div>
  );
};

export default ProductsPage;
