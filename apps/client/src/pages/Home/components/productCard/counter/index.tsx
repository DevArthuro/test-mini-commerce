import { useMemo } from "react";

const Counter: React.FC<{
  quantity: number;
  limitStock: number;
  increase: () => void;
  decrease: () => void;
}> = ({ limitStock, quantity, increase, decrease }) => {
  const isActiveDecrease = useMemo(() => quantity === 0, [quantity]);
  const isActiveIncrease = useMemo(() => quantity === limitStock, [quantity]);

  return (
    <section className="counter">
      <button
        className={`counter__button counter__button--decrease ${isActiveDecrease ? "counter__button--disabled" : ""}`}
        onClick={decrease}
        disabled={isActiveDecrease}
      >
        -
      </button>
      <span className="counter__display">{quantity}</span>
      <button
        className={`counter__button counter__button--increase ${isActiveIncrease ? "counter__button--disabled" : ""}`}
        onClick={increase}
        disabled={isActiveIncrease}
      >
        +
      </button>
    </section>
  );
};

export default Counter;
