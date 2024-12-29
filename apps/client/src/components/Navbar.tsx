import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { ordersData } from "../store/selectors";

const Navbar = () => {

  const orderData = useSelector(ordersData);

  return (
    <>
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__brand">
            <h1>MiniCommerce.com</h1>
          </div>
          <div className="navbar__right">
            {orderData && <button className="navbar__button">Ver pedido</button>}
          </div>
        </div>
      </div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Navbar;
