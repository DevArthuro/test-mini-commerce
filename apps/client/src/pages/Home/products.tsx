import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import ProductCard from "./components/productCard";

const ProductsPage = () => {

  const products = useSelector((state: RootState) => state.products.products)
  const isLoading = useSelector((state: RootState) => state.products.loading);
  const isError = useSelector((state: RootState) => state.products.error);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isError ? (
        <p>something is wrong</p>
      ) : (
        <div>
          {products.length > 0 ? (
              products.map((prouct) => <ProductCard {...prouct} key={prouct.id} />)
          ) : (
            <p>Any products available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsPage