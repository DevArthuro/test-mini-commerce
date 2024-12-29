import { useDispatch, useSelector } from "react-redux";
import { transactionData, transactionId } from "../../store/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { fetchtransactionById } from "../../store/slice/transactions";
import { PaymentStatus } from "../../types/payments";
import "./checkout.scss";

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
      dispatch(fetchtransactionById(IdTransaction));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction, IdTransaction]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const {
    order: {
      product: { name, description, price, imageUrl },
      quantity,
      customer: { fullName, email, phoneNumber },
    },
    status,
  } = transaction;

  const totalPrice = price * quantity;
  const deliveryFee = totalPrice * 0.05;
  const storeFee = totalPrice * 0.03;
  const grandTotal = totalPrice + deliveryFee + storeFee;

  return (
    <div className="checkout">
      <h1>Transaction Summary</h1>
      <h2>Status: {status}</h2>

      <div className="checkout__product">
        <img src={imageUrl} alt={name} className="checkout__product-image" />
        <div className="checkout__product-details">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Unit Price: ${price.toLocaleString()}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>

      <div className="checkout__summary">
        <h2>Order Summary</h2>
        <p>Total Price: ${totalPrice.toLocaleString()}</p>
        <p>Delivery Fee (5%): ${deliveryFee.toFixed(2)}</p>
        <p>Store Fee (3%): ${storeFee.toFixed(2)}</p>
        <hr />
        <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
      </div>

      <div className="checkout__customer">
        <h2>Customer Details</h2>
        <p>Name: {fullName}</p>
        <p>Email: {email}</p>
        <p>Phone: {phoneNumber}</p>
      </div>
    </div>
  );
};

export default Checkout;
