
import { Suspense } from "react"
import ProductsPage from "../../components/template/ProductsPage"

export default function Products() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-5">
          Loading products...
        </div>
      }
    >
      <ProductsPage />
    </Suspense>
  )
}

