"use client"
import { useEffect, useRef, useState } from "react"
import { useProducts } from "../../query/hooks/useProducts"
import Card from "../module/Card"
import { MdManageSearch, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { categoryProducts, createQueryObject, searchProducts } from "../../utils/filterProducts"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Loader from "../module/Loader"


function ProductsPage() {
  const { data, isLoading } = useProducts()

  const [displayed, setDisplayed] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState({})

  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams()
  const detailsRef = useRef(null)

  useEffect(() => {
    setDisplayed(data)
    const query = {}
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    if (category) query.category = category
    if (search) query.search = search
    if (data) setQuery(query)

  }, [data])

  useEffect(() => {
    const params = new URLSearchParams()

    if (query.search) params.set("search", query.search);
    else params.delete("search");
    if (query.category) params.set("category", query.category);
    else params.delete("category");

    router.replace(`${pathname}?${params.toString()}`)

    let finalProducts = searchProducts(data, query.search)
    finalProducts = categoryProducts(finalProducts, query.category)
    setDisplayed(finalProducts)
    console.log(displayed)
  }, [query])
  const searchHandler = () => {
    setQuery((query) => createQueryObject(query, { search }))
  }

  const categoryHandler = (event) => {
    const { tagName } = event.target
    const category = event.target.innerText.toLowerCase()
    if (tagName !== "LI") return
  if (category === "all") {
    detailsRef.current.open = false
  }
  console.log(category)
    setQuery((query) => createQueryObject(query, { category }))
  }

  if (query.category) {
    detailsRef.current.open = false
  }

  return (
    <div className=' mx-2.5'>
      <div >
        <div className="mt-10 mb-2.5 flex gap-3 h-9">
          <input
            className=" bg-white border-2 w-full sm:w-[30%] border-dashed border-orange outline-none rounded-[5px] text-[15px] placeholder:text-[#666] placeholder:text-[13px] p-1"
            placeholder="Search..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          />
          <button className="bg-orange text-2xl text-white rounded-[5px] p-1 px-1.5 "
            onClick={searchHandler}
          >
            <MdManageSearch />
          </button>
        </div>

        <details className="group" ref={detailsRef} >
          <summary className={`${query.category && "bg-orange!"} flex gap-1 items-center outline-none justify-center text-orange w-full px-2 py-1 rounded-md bg-white border-dashed border-orange border-2`}>
            <MdOutlineKeyboardArrowDown className={` ${query.category && "text-white font-semibold!"}text-2xl transition-transform duration-300 transform group-open:rotate-180`} />
            <span className={query.category && "font-semibold text-white"}> {query.category ? query.category : "Category"}</span>
          </summary>
          <div className="  group-open:block transition-transform transform duration-300 ease-in-out border-2 border-dashed border-[#666] shadow-lg rounded-md mt-0.5 bg-white leading-8 text-[15px] font-semibold ">
            <ul className='flex mb-2 flex-wrap mt-2.5 gap-1.5 *:px-1.5 justify-center *:border-amber-600 *:border-dashed *:rounded-md  *:border'
              onClick={categoryHandler}
            >
              <li >All</li>
              <li >Electronics</li>
              <li>Jewelery</li>
              <li >Men's Clothing </li>
              <li >Women's Clothing</li>
            </ul>
          </div>
        </details>
      </div>

      <div className="flex justify-center mt-5 ">
        <ul className="w-fit sm:flex sm:flex-wrap justify-between ">
          {isLoading && (<Loader />)}
          {displayed?.map((p) => (
            <li key={p.id}>
              <Card data={p} />
            </li>
          ))
          }

          {displayed?.length == 0  && (
            <p className="bg-orange-300  p-2.5 rounded-2xl text-orange font-semibold">No results found !</p>
          )}
        </ul>

      </div>
    </div>
  )
}

export default ProductsPage
