import { useDispatch, useSelector } from "react-redux";
import { transactionData, transactionId } from "../../store/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import {
  clearStateTransaction,
  fetchtransactionById,
} from "../../store/slice/transactions";
import { PaymentStatus, TypesInvoce } from "../../types/payments";
import "./checkout.scss";
import Loading from "../../components/loading";
import { clearStateOrder } from "../../store/slice/orders";
import { clearStateProduct } from "../../store/slice/products";
import ScrollToastProducts from "../../components/scrollToastProducts";

const Checkout = () => {
  const transaction = useSelector(transactionData);
  const IdTransaction = useSelector(transactionId);
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!transaction) {
      navigation("/");
    }

    if (IdTransaction && transaction?.status === PaymentStatus.PENDING) {
      const timer = setTimeout(() => {
        dispatch(fetchtransactionById(IdTransaction));
      }, 4000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction, IdTransaction]);

  const handlerClickReturnHome = () => {
    dispatch(clearStateOrder());
    dispatch(clearStateProduct());
    dispatch(clearStateTransaction());
    navigation("/");
  };

  if (!transaction) {
    return <Loading isActive={true} />;
  }

  const {
    order: {
      customer: { fullName, email, phoneNumber },
    },
    status,
  } = transaction;

  const INVOICE_DIAN =
    transaction.order.invoice &&
    transaction.order.invoice.linksInvoice.find(
      ({ referenceName }) => referenceName === TypesInvoce.INVOICE_DIAN
    )!;
  const INVOICE_FACTUS =
    transaction.order.invoice &&
    transaction.order.invoice.linksInvoice.find(
      ({ referenceName }) => referenceName === TypesInvoce.FACTUS
    )!;
  const QR_DIAN =
    transaction.order.invoice &&
    transaction.order.invoice.linksInvoice.find(
      ({ referenceName }) => referenceName === TypesInvoce.QR_DIAN
    )!;

  return (
    <div className="checkout">
      <h1>Transaction Summary</h1>
      <h2>Status: {status}</h2>

      <div className="checkout__product">
        <ScrollToastProducts title="Transaction Items" />
      </div>

      <div className="checkout__customer">
        <h2>Customer Details</h2>
        <p>Name: {fullName}</p>
        <p>Email: {email}</p>
        <p>Phone: {phoneNumber}</p>
      </div>

      {transaction.order?.invoice?.linksInvoice &&
        transaction.order?.invoice?.linksInvoice.length > 0 && (
          <div className="checkout__summary">
            <h2>Invoice Details</h2>
            <img src={QR_DIAN.link} alt="qr dian" />

            <div className="links">
              <a href={INVOICE_FACTUS.link} target="_blank">
                Invoice Facturation Mini commerce
              </a>
              <a href={INVOICE_DIAN.link} target="_blank">
                Invoice Facturation DIAN details
              </a>
            </div>
          </div>
        )}

      <div className="checkout__button">
        <button
          className="checkout__button-return-home"
          onClick={handlerClickReturnHome}
          disabled={transaction.status === PaymentStatus.PENDING}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Checkout;
