import { useSelector } from "react-redux";
import { ordersLoading, productsLoading, transactionIsLoading } from "../store/selectors";

const Loading: React.FC<{isActive?: boolean}> = ({isActive}) => {
  const isProductLoading = useSelector(productsLoading);
  const isOrderLoading = useSelector(ordersLoading);
  const isTransactionLoading = useSelector(transactionIsLoading);

  const isLoading =
    isTransactionLoading || isProductLoading || isOrderLoading || isActive;

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

