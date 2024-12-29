import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./navbar.scss";
import Loading from "./loading";

const Navbar = () => {

  return (
    <div className="main__app">
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__brand">
            <h1>MiniCommerce.com</h1>
          </div>
        </div>
      </div>
      <Suspense fallback={<Loading isActive={true} />}>
        <Outlet />
      </Suspense>
      <Loading />
    </div>
  );
};

export default Navbar;
