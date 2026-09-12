import Image from 'next/image'
import Link from 'next/link'
import {useDispatch, useSelector} from "react-redux"
import { RiDeleteBin2Line, RiShoppingBasketLine } from 'react-icons/ri'
import { TbListDetails } from 'react-icons/tb'
import { MdOutlineRemove } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { productQuantity, shortenText } from '../../utils/helper'
import {addItem, decrease, increase, removeItem} from "../../redux/features/cart/cartSlice"


function Card({ data }) {

    const { image, price, title, id } = data

    const state = useSelector((store)=> store.cart)
    const dispatch = useDispatch()
    const quantity = productQuantity(state, id)

    return (
        <div className='w-60 m-2.5 p-5 flex flex-col items-center bg-white border-2 border-dashed border-[#e2e2e2] rounded-[20px]'>
            <Image className='p-2.5 mb-2.5 bg-white w-40 h-40'
                src={image}
                width={150}
                height={150}
                alt={title}
            />
            <div className='flex flex-col w-full' >
                <h3 className='text-orange text-[1.1rem]'>{shortenText(title)}</h3>
                <p className='text-[#666] text-[0.9rem] font-semibold mt-2.5 mb-7.5 '>{price} $</p>
            </div>
            <div className='flex w-full justify-between items-center'>
                <Link href={`/products/${id}`} className='text-2xl h-6 text-orange '>
                    <TbListDetails />
                </Link>
                <div className='flex'>
                    {
                        quantity === 1 && (<button onClick={() => dispatch(removeItem(data))}>
                            <RiDeleteBin2Line className='text-3xl p-0.5 bg-orange text-white rounded-[5px]' />
                        </button>)
                    }
                    {
                        quantity > 1 && (
                            <button onClick={() => dispatch(decrease(data))}>
                                <MdOutlineRemove className='text-3xl p-0.5 bg-orange text-white rounded-[5px]' />
                            </button>

                        )
                    }
                    <span className='mx-3 flex items-center'>{quantity >= 1 && (quantity)}</span>
                    {
                        quantity === 0 ? (
                            <button onClick={() => dispatch(addItem(data))}>
                                <RiShoppingBasketLine className='text-3xl p-0.5 bg-orange text-white rounded-[5px]' />
                            </button>
                        ) : (
                            <button onClick={() => dispatch(increase(data))}>
                                <IoMdAdd className='text-3xl p-0.5 bg-orange text-white rounded-[5px]' />
                            </button>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Card
