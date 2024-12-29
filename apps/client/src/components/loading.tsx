import { useSelector } from "react-redux";
import { ordersLoading, productsLoading } from "../store/selectors";

const Loading = () => {
  const isProductLoading = useSelector(productsLoading);
  const isOrderLoading = useSelector(ordersLoading);

  const isLoading = isProductLoading || isOrderLoading;

  return (
    <>
      {isLoading && (
        <div className="main__app-overlay">
          <div className="main__app-loader"></div>
        </div>
      )}
    </>
  );
};

export default Loading;

