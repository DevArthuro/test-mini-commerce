import { useCallback, useState } from "react";
import { Product } from "../../../../types/products";
import Counter from "./counter";
import "./productCard.scss";

const ProductCard: React.FC<Product> = ({
  name,
  description,
  id,
  imageUrl,
  price,
  stock,
}) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = useCallback(() => {
    setQuantity((lastQuantity) => lastQuantity + 1);
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((lastQuantity) => lastQuantity - 1);
  }, []);

  return (
    <div className="custom-card">
      <div className="custom-card__image-container">
        <img src={imageUrl} alt={name} className="custom-card__image" />
        {stock < 5 && stock > 0 && (
          <span className="custom-card__stock-alert">
            Only {stock} left in stock!
          </span>
        )}
        {stock === 0 && (
          <span className="custom-card__stock-alert">Not available</span>
        )}
        <span className="custom-card__stock-available">{stock}</span>
      </div>
      <div className="custom-card__content">
        <div className="custom-card__header">
          <p className="custom-card__title">{name}</p>
          <p className="custom-card__description">{description}</p>
        </div>
        <div className="custom-card__footer">
          <span className="custom-card__price">
            ${quantity === 0 ? price : price * quantity}
          </span>
          <Counter
            decrease={decreaseQuantity}
            increase={increaseQuantity}
            limitStock={stock}
            quantity={quantity}
            productId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
