import { useContext, useMemo } from "react";
import { contextModalState } from "../../../../../context/modalConext";

const Counter: React.FC<{
  quantity: number;
  limitStock: number;
  productId: string;
  increase: () => void;
  decrease: () => void;
}> = ({ limitStock, quantity, increase, decrease, productId }) => {
  const isActiveDecrease = useMemo(() => quantity === 0, [quantity]);
  const isActiveIncrease = useMemo(() => quantity === limitStock, [quantity]);

  const { addProductCart, deleteProductCart } = useContext(contextModalState);

  enum TYPE_ACTION_CHANGE_QUANTITY {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE"
  }

  const handlerChangeQuantity = (action: TYPE_ACTION_CHANGE_QUANTITY) => {
    switch (action) {
      case TYPE_ACTION_CHANGE_QUANTITY.INCREASE:
        increase();
        addProductCart(productId, quantity + 1);
        break
      case TYPE_ACTION_CHANGE_QUANTITY.DECREASE:
        decrease();
        if (quantity - 1 === 0) {
          deleteProductCart(productId);
          break;
        }
        addProductCart(productId, quantity - 1);
        break
    }
  }

  return (
    <section className="counter">
      <button
        className={`counter__button counter__button--decrease ${isActiveDecrease ? "counter__button--disabled" : ""}`}
        onClick={() => {
          handlerChangeQuantity(TYPE_ACTION_CHANGE_QUANTITY.DECREASE);
        }}
        disabled={isActiveDecrease}
      >
        -
      </button>
      <span className="counter__display">{quantity}</span>
      <button
        className={`counter__button counter__button--increase ${isActiveIncrease ? "counter__button--disabled" : ""}`}
        onClick={() => {
          handlerChangeQuantity(TYPE_ACTION_CHANGE_QUANTITY.INCREASE);
        }}
        disabled={isActiveIncrease}
      >
        +
      </button>
    </section>
  );
};

export default Counter;
