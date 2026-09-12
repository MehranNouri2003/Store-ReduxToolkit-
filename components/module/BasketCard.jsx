"use client"
import Image from 'next/image'
import { shortenText } from '../../utils/helper'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { MdOutlineRemove } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { decrease, increase, removeItem } from '../../redux/features/cart/cartSlice'

function BasketCard({ data }) {
    const dispatch = useDispatch()


  return (
    <div className='flex border-2 mb-2.5 border-gray-500 border-dashed justify-between p-3 rounded-2xl items-center '>
      <Image className='w-15 h-15 '
        src={data.image}
        alt={data.title}
        width={50}
        height={50} />
      <p className='text-[12px]'>{shortenText(data.title)}</p>

      <div className='flex gap-2'>
        {
          data.quantity === 1 && (
            <button onClick={() => dispatch(removeItem(data))}>
              <RiDeleteBin2Line className='text-[20px] p-0.5 bg-orange text-white rounded-[5px]' />
            </button>)
        }
        {
          data.quantity > 1 && (
            <button onClick={() => dispatch(decrease(data))}>
              <MdOutlineRemove className='text-[20px] p-0.5 bg-orange text-white rounded-[5px]' />
            </button>

          )
        }
        <span className='text-[15px]'>
          {data.quantity}
        </span>
        <button onClick={() => dispatch(increase(data))}>
          <IoMdAdd className='text-[20px] p-0.5 bg-orange text-white rounded-[5px]' />
        </button>
      </div>
    </div>
  )
}

export default BasketCard
