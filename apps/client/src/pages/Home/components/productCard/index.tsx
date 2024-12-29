import { useCallback, useContext, useState } from "react";
import { Product } from "../../../../types/products";
import Counter from "./counter";
import { contextModalState } from "../../../../context/modalConext";

const ProductCard: React.FC<Product> = ({
  name,
  description,
  id,
  imageUrl,
  price,
  stock,
}) => {
  /** State */
  const [quantity, setQuantity] = useState(0);

  /** Context */
  const { openModal, handlerOpenModal } = useContext(contextModalState);

  /** Handlers */
  const handlerBuyProduct = useCallback(() => {
    alert(quantity);
    handlerOpenModal(id, quantity);
  }, [quantity]);

  const increaseQuantity = useCallback(() => {
    setQuantity((lastQuantity) => lastQuantity + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((lastQuantity) => lastQuantity - 1);
  }, []);

  return (
    <section>
      <article>
        <img src={imageUrl} alt={name} width={350} height={350} />
      </article>
      <article>
        <h2>{name}</h2>
      </article>
      <article>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Units available: {stock}</p>
        <Counter
          quantity={quantity}
          decrease={decreaseQuantity}
          increase={increaseQuantity}
          limitStock={stock}
        />
      </article>
      <article>
        <button onClick={handlerBuyProduct} disabled={openModal}>
          Pay with credit card
        </button>
      </article>
    </section>
  );
};

export default ProductCard;
