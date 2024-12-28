import { useContext } from "react";
import { contextModalState } from "../../../context/modalConext";

const ModalBuyProduct = () => {
  const { openModal, idProduct, quantity, handlerCloseModal } = useContext(contextModalState);
  return (
    <>
      {openModal && (
        <div>
          <p>idProduct: {idProduct}</p>
          <p>quantity: {quantity}</p>
          <button onClick={handlerCloseModal}>Close modal</button>
        </div>
      )}
    </>
  );
};

export default ModalBuyProduct;
