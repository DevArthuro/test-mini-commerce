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
    <section>
      <button onClick={decrease} disabled={isActiveDecrease}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={increase} disabled={isActiveIncrease}>
        +
      </button>
    </section>
  );
};

export default Counter;
