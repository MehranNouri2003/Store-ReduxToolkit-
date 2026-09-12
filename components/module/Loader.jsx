import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

function Loader() {
    return (
        <div className='w-full text-center h-250 mt25'>
            <RotatingLines
                width={100}
                height={100}
                strokeColor='#fe5d42'
                strokeWidth={3}
            />
        </div>
    )
}

export default Loader
