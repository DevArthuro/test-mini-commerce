import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { ordersData } from "../store/selectors";
import Loading from "./loading";

const Navbar = () => {

  const orderData = useSelector(ordersData);

  return (
    <div className="main__app">
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
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Loading />
    </div>
  );
};

export default Navbar;
