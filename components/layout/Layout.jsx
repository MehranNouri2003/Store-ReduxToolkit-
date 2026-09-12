"use client"
import Link from 'next/link'
import { SlBasket } from 'react-icons/sl'
import { useSelector } from 'react-redux'

function Layout({ children }) {
    const state = useSelector((store)=> store.cart)
    

    return (
        <div className='mx-2.5 pt-2.5 '>
            <header className=' sticky left-5 right-5 top-0 z-10 flex items-center justify-between bg-orange text-white py-2.5 px-5 mb-15 rounded-[10px]'>
                <h1 className='font-semibold text-2xl'>Shop Project</h1>
                <Link href="/checkout">
                    <div className='font-[1.6rem] bg-white text-center text-orange h-8.75 w-8.75 rounded-[9px] p-0.5 relative'>
                        {
                            !!state.itemsCounter && (
                                <span className='text-[0.9rem]  w-5 h-5 leading-5 bg-black text-white rounded-[50%] absolute -top-2.5 -right-2.5'>
                                    {state.itemsCounter}
                                </span>
                            )
                        }
                        <SlBasket className='font-normal text-2xl ml-0.5 mt-0.5' />
                    </div>
                </Link>
            </header>
            {children}
            <div className='text-center bg-orange p-5 m-2.5 mt-20 rounded-[10px] text-white '>
                <p>Developed by Mehran with ❤️
                </p>
            </div>
        </div>
    )
}

export default Layout
