import { useDispatch, useSelector } from "react-redux";
import {
  ordersError,
  productsError,
  transactionError,
} from "../../store/selectors";
import "./modalError.scss";
import { clearStateOrder } from "../../store/slice/orders";
import { clearStateProduct } from "../../store/slice/products";
import { clearStateTransaction } from "../../store/slice/transactions";

const ModalError = () => {

  const dispatch = useDispatch()
  const isErrorProduct = useSelector(productsError);
  const isErrorOrder = useSelector(ordersError);
  const isErrorTransaction = useSelector(transactionError);

  const handlerClick = () => {
    alert("the system is to reset");
    dispatch(clearStateOrder());
    dispatch(clearStateProduct());
    dispatch(clearStateTransaction());
    window.location.href = "/";
  };

  const showMessage = () => {
    if (isErrorProduct) return isErrorProduct;
    else if (isErrorOrder) return isErrorOrder;
    else if (isErrorTransaction) return isErrorTransaction;
    return "Unknown error";
  };

  const showTitle = () => {
    if (isErrorProduct) return "Product Error";
    else if (isErrorOrder) return "Order Error";
    else if (isErrorTransaction) return "Transaction Error";
    return "";
  };

  return (
    <>
      {(isErrorOrder || isErrorProduct || isErrorTransaction) && (
        <>
          <div className="modal__background"></div>
          <div className="modal__errors">
            <section className="modal__errors-title">
              <h1>{showTitle()}</h1>
            </section>
            <section className="modal__errors-description">
              <p>{showMessage()}</p>
            </section>
            <section className="modal__errors-button">
              <button onClick={handlerClick}>Aceptar</button>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default ModalError;
