"use client"

import { useRef } from "react"
import { useProducts } from "../../query/hooks/useProducts"
import Card from "../module/Card"
import Loader from "../module/Loader"
import {
  MdManageSearch,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md"
import {
  categoryProducts,
  searchProducts,
} from "../../utils/filterProducts"
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

function ProductsPage() {
  const { data, isLoading } = useProducts()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const detailsRef = useRef(null)
  const searchInputRef = useRef(null)

  const activeSearch = searchParams.get("search") || ""
  const activeCategory = searchParams.get("category") || ""

  const products = Array.isArray(data) ? data : []

  const searchedProducts = searchProducts(
    products,
    activeSearch
  )

  const displayed = categoryProducts(
    searchedProducts,
    activeCategory
  )

  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    const queryString = params.toString()

    router.replace(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    )
  }

  const searchHandler = () => {
    const value =
      searchInputRef.current?.value.trim().toLowerCase() || ""

    updateURL({ search: value })
  }

  const categoryHandler = (event) => {
    const item = event.target.closest("li[data-category]")

    if (!item || !event.currentTarget.contains(item)) return

    const category = item.dataset.category

    updateURL({
      category: category === "all" ? "" : category,
    })

    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }

  return (
    <div className="mx-2.5">
      <div>
        <div className="mt-10 mb-2.5 flex h-9 gap-3">
          <input
            key={activeSearch}
            ref={searchInputRef}
            className="w-full rounded-[5px] border-2 border-dashed border-orange bg-white p-1 text-[15px] outline-none placeholder:text-[13px] placeholder:text-[#666] sm:w-[30%]"
            placeholder="Search..."
            type="text"
            defaultValue={activeSearch}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchHandler()
              }
            }}
          />

          <button
            type="button"
            className="rounded-[5px] bg-orange px-1.5 p-1 text-2xl text-white"
            onClick={searchHandler}
            aria-label="Search products"
          >
            <MdManageSearch />
          </button>
        </div>

        <details className="group" ref={detailsRef}>
          <summary
            className={`flex w-full items-center justify-center gap-1 rounded-md border-2 border-dashed border-orange bg-white px-2 py-1 text-orange outline-none ${
              activeCategory ? "bg-orange!" : ""
            }`}
          >
            <MdOutlineKeyboardArrowDown
              className={`transform text-2xl transition-transform duration-300 group-open:rotate-180 ${
                activeCategory
                  ? "font-semibold! text-white"
                  : ""
              }`}
            />

            <span
              className={
                activeCategory
                  ? "font-semibold text-white"
                  : ""
              }
            >
              {activeCategory || "Category"}
            </span>
          </summary>

          <div className="mt-0.5 rounded-md border-2 border-dashed border-[#666] bg-white text-[15px] leading-8 font-semibold shadow-lg">
            <ul
              className="mt-2.5 mb-2 flex flex-wrap justify-center gap-1.5 *:rounded-md *:border *:border-dashed *:border-amber-600 *:px-1.5"
              onClick={categoryHandler}
            >
              <li data-category="all">All</li>
              <li data-category="electronics">Electronics</li>
              <li data-category="jewelery">Jewelery</li>
              <li data-category="men's clothing">
                Men&apos;s Clothing
              </li>
              <li data-category="women's clothing">
                Women&apos;s Clothing
              </li>
            </ul>
          </div>
        </details>
      </div>

      <div className="mt-5 flex justify-center">
        <ul className="w-fit justify-between sm:flex sm:flex-wrap">
          {isLoading && <Loader />}

          {!isLoading &&
            displayed.map((product) => (
              <li key={product.id}>
                <Card data={product} />
              </li>
            ))}

          {!isLoading && displayed.length === 0 && (
            <li>
              <p className="rounded-2xl bg-orange-300 p-2.5 font-semibold text-orange">
                No results found!
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ProductsPage

