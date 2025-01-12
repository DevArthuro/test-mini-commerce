import { useSelector } from "react-redux";
import {
  getProductFormatCalculate,
  ProductsFormatOrder,
} from "../../utils/products";
import "./scrollToastProduct.scss";
import { productsData } from "../../store/selectors";
import { useContext, useState } from "react";
import { contextModalState } from "../../context/modalConext";
import { FEE_BOUGHT, FEE_DELIVERY } from "../../utils/fee";
import ShowLogo from "../../assets/show.svg";
import HiddenLogo from "../../assets/hidden.svg";

const ScrollToastProducts = () => {
  const products = useSelector(productsData);
  const [openCartDetails, setCartDetails] = useState(false);
  const { products: productsCart } = useContext(contextModalState);

  const [productsFormat] = useState<ProductsFormatOrder>(() => {
    const productsFormatOrder = getProductFormatCalculate(
      products,
      productsCart
    );

    return productsFormatOrder;
  });

  return (
    <>
      {productsFormat && (
        <div className="product__toast">
          <div className="product__toast__header">
            <h2 className="product__toast__header-title">Cart Details</h2>
            <figure
              title="click here to show or hidden"
              className="product__toast__header-logo"
              onClick={() => setCartDetails(!openCartDetails)}
            >
              <img
                src={openCartDetails ? ShowLogo : HiddenLogo}
                alt="show info cart"
              />
            </figure>
          </div>
          {openCartDetails && (
            <>
              <ul className="product__toast__list">
                {productsFormat.products.map((product) => {
                  return (
                    <li key={product.id} className="product__toast__list-item">
                      <img src={product.imageUrl} alt={product.name} />
                      <div className="product__toast__list-item-details">
                        <h3>{product.name}</h3>
                      </div>
                      <div className="product__toast__list-item-pricing">
                        <p>
                          Total:{" "}
                          <span className="product__toast__list-item-pricing-span">
                            ${product.total}
                          </span>
                        </p>
                        <p>
                          Quantity:{" "}
                          <span className="product__toast__list-item-pricing-span">
                            {product.quantity}
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <hr className="product__toast-separator" />
              <ul className="product__toast__list">
                <li className="product__toast__list-item-price">
                  <h4>Price Products Total</h4>
                  <p>${productsFormat.totalProducts}</p>
                </li>
                <li className="product__toast__list-item-price">
                  <h4>sales rate ({FEE_BOUGHT * 100}%)</h4>
                  <p>${productsFormat.totalFeeBought}</p>
                </li>
                <li className="product__toast__list-item-price">
                  <h4>shipping rate ({FEE_DELIVERY * 100}%)</h4>
                  <p>${productsFormat.totalFeeDelivery}</p>
                </li>
                <li className="product__toast__list-item-price">
                  <h4>Total Amount</h4>
                  <p>${productsFormat.totalAmount}</p>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ScrollToastProducts;
