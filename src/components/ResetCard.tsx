import { resetCart } from '@/store/nextSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const ResetCard = () => {
    const dispatch =useDispatch()
    const handleResetCart=()=>{
        const confirmReset=window.confirm('Are you sure to reset the cart.....!!!!!')
        if(confirmReset){
            dispatch(resetCart())
        }
    }
  return (
    <div>
      <button onClick={handleResetCart} className='w-44 h-19 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-500'>Reset</button>
    </div>
  )
}

export default ResetCard
