import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ProductCard from "./components/productCard";
import ModalBuyProduct from "./components/modalBuyProduct";
import { ContextModalProvider, ProductBuy } from "../../context/modalConext";
import { useEffect, useState } from "react";
import "./products.scss";
import { orderDataIdOrder } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import { fetchPoducts } from "../../store/slice/products";
import PayButton from "./components/productCard/payButton";

const ProductsPage = () => {
  const [modalState, setModalState] = useState<{
    openModal: boolean;
    products: ProductBuy
  }>({
    products: {},
    openModal: false,
  });
  const dispatch = useDispatch<AppDispatch>()
  const orderId = useSelector(orderDataIdOrder);
  const products = useSelector((state: RootState) => state.products.data);
  const isError = useSelector((state: RootState) => state.products.error);

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      navigate("/summary");
    }
    if (products.length === 0) {
      dispatch(fetchPoducts());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const openModal = () => {
    setModalState((prev) => ({
      ...prev,
      openModal: true,
    }));
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      openModal: false,
      products: {}
    }));
  };

  const deleteProductCart = (productId: string) => {
    const productDelete = Object.entries(modalState.products).filter(([id, value]) => {
      if (productId !== id) {
        return [id, value];
      }
    });
    setModalState((prev) => ({
      ...prev,
      products: Object.fromEntries(productDelete),
    }));
  }

  const addProductCart = (productId: string, quantity: number) => {
    console.log(productId, quantity)
    setModalState((prev) => ({
      ...prev,
      products: {
        ...prev.products,
        [productId]: { quantity },
      },
    }));
  };

  return (
    <div className="products">
      <ContextModalProvider
        value={{
          ...modalState,
          handlerOpenModal: openModal,
          handlerCloseModal: closeModal,
          addProductCart,
          deleteProductCart,
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
      <PayButton />
    </div>
  );
};

export default ProductsPage;
