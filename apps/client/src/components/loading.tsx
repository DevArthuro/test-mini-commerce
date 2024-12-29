import { useSelector } from "react-redux";
import { ordersLoading, productsLoading } from "../store/selectors";

const Loading: React.FC<{isActive?: boolean}> = ({isActive}) => {
  const isProductLoading = useSelector(productsLoading);
  const isOrderLoading = useSelector(ordersLoading);

  const isLoading = isProductLoading || isOrderLoading || isActive;

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
