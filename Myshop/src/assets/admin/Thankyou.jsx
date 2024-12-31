import React from 'react'
// import cssmod from '../css/404err.module.css'
import { Link } from 'react-router-dom'

const Thankyou = () => {
  return (
    <div className='w-full h-full bg-gray-700 p-40' style={{color:'white'}}>
                <h1 className='p-10 text-5xl'>THANK YOU !!!</h1>
                <h2 className='p-10'><Link to='/' className='w-full sm:w-auto px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-400 transition duration-200'>Continue Shopping</Link></h2>
            </div>
  )
}

export default Thankyou
