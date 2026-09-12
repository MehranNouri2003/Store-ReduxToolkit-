"use client"
import { MdEditNote, MdOutlinePriceCheck } from "react-icons/md"
import { FaSlackHash } from "react-icons/fa"
import { RiLoaderLine } from "react-icons/ri"
import Link from "next/link"
import BasketCard from "../module/BasketCard"
import { useSelector } from "react-redux"


function CheckoutPage() {
    const state = useSelector((store)=> store.cart)
    const selectedItems = state.selectedItems


    console.log(state)
    return (
        <div className="mx-2.5 md:flex gap-5 mb-100">
            <div className=" *:flex *:text-orange mb-5 h-fit border-orange border-2 border-dashed rounded-2xl p-3 *:gap-1.5 *:mb-2 *:font-semibold">
                <div>
                    <MdOutlinePriceCheck />
                    <p>Total:</p>
                    <span className="text-gray-500">{state.total} $</span>
                </div>
                <div>
                    <FaSlackHash />
                    <p>Quantity:</p>
                    <span className="text-gray-500">{state.itemsCounter}</span>
                </div>
                <div>
                    <MdEditNote />
                    <p>Items:</p>
                    <span className="text-gray-500">{selectedItems.length}</span>
                </div>
                <div>
                    <RiLoaderLine />
                    <p>Status:</p>
                    <span className="text-gray-500">Pending...</span>
                </div>
                <div className=" justify-center mt-10 ">
                    <Link href={""} className="text-white! font-medium! text-center py-1.5 rounded-2xl w-[70%] bg-orange  ">Checkout</Link>
                </div>
            </div>
            <div className="w-full">
                {!selectedItems.length && (
                    <div className="w-full text-center">
                        <h2 className=" mb-10 bg-green-500 p-2 rounded-2xl ">Your Shopping Cart is empty!</h2>
                        <Link href="/products" className="bg-orange p-2.5 rounded-2xl text-white border-2 border-dashed " >Products Page</Link>
                    </div>
                )}
                {selectedItems.map((product) => (
                    <BasketCard key={product.id} data={product}/>
                ))}
            </div>
        </div>
    )
}

export default CheckoutPage
