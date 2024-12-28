import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

const ProductsPage = () => {

  const products = useSelector((state: RootState) => state.products.products)

  return (
    <div>{JSON.stringify(products)}</div>
  )
}

export default ProductsPage