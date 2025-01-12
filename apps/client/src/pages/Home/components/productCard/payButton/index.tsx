import { useContext } from "react";
import { contextModalState } from "../../../../../context/modalConext";

const PayButton = () => {
  const { products } = useContext(contextModalState);

  return (
      <button
          onClick={() => {
              console.log(products);
          }}
      className={`custom-card_button ${!(Object.keys(products).length > 0) ? "custom-card_button-disabled" : null}`}
    >
      Pay with credit card
    </button>
  );
};

export default PayButton;
