import { useDispatch, useSelector } from "react-redux";
import {
  orderDataById,
  orderDataIdOrder,
  ordersError,
  transactionData,
} from "../../store/selectors";
import { useCallback, useEffect } from "react";
import { fetchOrderByReference } from "../../store/slice/orders";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import "./summary.scss";
import { OrderStatus } from "../../types/orders";
import { fetchCreateTransaction } from "../../store/slice/transactions";
import Loading from "../../components/loading";
import ScrollToastProducts from "../../components/scrollToastProducts";

const SummaryPage = () => {
  const transaction = useSelector(transactionData);
  const orderId = useSelector(orderDataIdOrder);
  const orders = useSelector(orderDataById);
  const isError = useSelector(ordersError);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  const showAccecibleStatus = useCallback((status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "pendiente del pago";
      case OrderStatus.FAILED:
        return "cancelado";
      case OrderStatus.PAID:
        return "pagado";
    }
  }, []);

  useEffect(() => {
    if (orderId && !orders) {
      dispatch(fetchOrderByReference(orderId));
    } else if (isError || !orderId) {
      navigation("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (isError) {
    navigation("/");
  }

  if (transaction) {
    navigation("/checkout");
  }

  if (!orders) {
    return <Loading />
  }

  const handleSubmitPay = () => {
    if (orders?.reference) {
      dispatch(fetchCreateTransaction({ orderReference: orders?.reference }));
    }
  };

  return (
    <div className="summary">
      {orders ? (
        <div className="summary__container">
          <h1 className="summary__title">Order Summary</h1>
          <div className="summary__section">
            <h2 className="summary__subtitle">Customer Information</h2>
            <p>
              <strong>Name:</strong> {orders.customer.fullName}
            </p>
            <p>
              <strong>Email:</strong> {orders.customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {orders.customer.phoneNumber}
            </p>
            <p>
              <strong>Document:</strong> {orders.customer.fullDocument}
            </p>
          </div>
          <div className="summary__section">
            <h2 className="summary__subtitle">Delivery Address</h2>
            <p>
              <strong>Country:</strong> {orders.customer.delivery.country}
            </p>
            <p>
              <strong>Region:</strong> {orders.customer.delivery.region}
            </p>
            <p>
              <strong>City:</strong> {orders.customer.delivery.city}
            </p>
            <p>
              <strong>Address:</strong> {orders.customer.delivery.address}
            </p>
          </div>
          <div className="summary__section">
            <h2 className="summary__subtitle">Payment Information</h2>
            <p>
              <strong>Card Name:</strong> {orders.customer.card.cardName}
            </p>
            <p>
              <strong>Card Number:</strong> **** **** ****{" "}
              {orders.customer.card.number}
            </p>
            <p>
              <strong>Expiration Date:</strong> {orders.customer.card.exp_date}
            </p>
          </div>
          <div className="summary__section">
            <h2 className="summary__subtitle">Order Summar</h2>
            <p>
              <strong>Status:</strong> {showAccecibleStatus(orders.status)}
            </p>
            <p>
              <strong>Reference:</strong> {orders.reference}
            </p>
          </div>
          <div className="summary__section">
            <h2 className="summary__subtitle">Cart Summary</h2>
            <ScrollToastProducts />
          </div>
          <button className="summary__pay-button" onClick={handleSubmitPay}>
            Confirm
          </button>
        </div>
      ) : (
        <p className="summary__error">Order not found</p>
      )}
    </div>
  );
};

export default SummaryPage;
