"use client"
import { useParams } from 'next/navigation'
import { useProducts } from '../../query/hooks/useProducts'

import Image from 'next/image'
import Link from 'next/link'
import { IoMdPricetag } from 'react-icons/io'
import { FaArrowLeft } from 'react-icons/fa'
import { MdEco } from 'react-icons/md'
import Loader from '../module/Loader'

function ProductsDetails() {
  const { id } = useParams()

  const { data, isLoading } = useProducts()

  if (isLoading || !data) return <Loader />
  const { image, title, description, category, price } = data.find((p) => p.id == id)




  return (
    <div className='mx-2.5 md:flex gap-5 m-auto'>
      <div className='flex justify-center items-center w-70 mb-10  h-fit md:min-w-70 rounded-[40px] py-5 border-2 border-dashed border-orange shadow-lg bg-white'>
        <Image className='w-55 h-60 '
          src={image}
          width={150}
          height={150}
          alt='title'
          />
      </div>
      <div className='border-2 border-dashed border-[#666] shadow-lg  rounded-[40px] p-7 w-fit'>
        <h3 className='text-orange text-2xl font-semibold mb-8'>{title}</h3>
        <p className='text-[#666] mb-6'> {description} </p>
        <p className='flex gap-2 font-semibold'> <MdEco className='text-orange text-2xl' /> {category}</p>
        <div className='flex items-center justify-between'>
          <span className='flex gap-2 font-semibold '>
            <IoMdPricetag className='text-orange text-2xl' />
            {price} $
          </span>
          <Link href="/products" className='bg-orange mt-2 text-[13px] text-white p-2.5 text-center flex w-fit justify-center items-center gap-2 rounded-2xl font-semibold'>
            <FaArrowLeft className='' />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductsDetails
