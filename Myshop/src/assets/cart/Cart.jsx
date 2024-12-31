import React, { useEffect } from 'react'
import { BsTrash } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CALCULATE_TOTAL, DECREASE, EMPTY_CART, INCREASE, REMOVE_FROM_CART, selectCartItems, selectTotal } from '../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/authSlice'
import { toast } from 'react-toastify'

const Cart = () => {

    const cartItems = useSelector(selectCartItems)
    const total = useSelector(selectTotal)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CALCULATE_TOTAL())
    }, [cartItems])

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const redirect = useNavigate()
    const location = useLocation()
    //   console.log(location)
    const handleCheckout = () => {
        if (!isLoggedIn) {
            toast.error("please login first")
            redirect('/login', { state: { to: location.pathname } })
        }
        else { redirect('/checkout') }
    }

    return (
        <>
            <div className="max-w-7xl mx-auto p-8 bg-gray-100">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-6 border-b border-gray-200">
                                    <div className="flex items-center gap-6">
                                        <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                                            <p className="text-gray-600">Price: ₹{item.sellingPrice}</p>
                                            <p className="text-gray-600">Total Price: ₹{(item.qty * item.sellingPrice)}</p>
                                            <div className="flex items-center mt-4">
                                                <button type="button" className="w-12 p-2" onClick={() => dispatch(DECREASE(item))}>-</button>
                                                <input type="text" value={item.qty}
                                                    className="w-12 p-2 border border-gray-300 rounded-lg text-center"
                                                />
                                                <button type="button" className="w-12 p-2" onClick={() => dispatch(INCREASE(item))}>+</button>
                                            </div>  </div>  </div>
                                    <button type='button' className='text-red-500 text-2xl' onClick={() => dispatch(REMOVE_FROM_CART(item.id))}><BsTrash></BsTrash></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="bg-white shadow-lg p-8 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                            <div className="flex justify-between text-lg mb-4">
                                <span className="text-gray-700">Subtotal</span>
                                <span className="font-medium text-gray-900">₹{total}</span>
                            </div>
                            <div className="flex justify-between text-lg mb-4">
                                <span className="text-gray-700">Shipping</span>
                                <span className="font-medium text-gray-900">₹{total > 0 && total < 2000 ? "50.00" : "0.00"}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-6">
                                <span>Total</span>
                                <span className="text-gray-900">₹{<>{total > 0 && total < 2000 ? (total + 50) : (total + 0)} </>}</span>
                            </div>
                            <div className="flex justify-between">
                                <button className="mt-8 w-52 bg-red-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-red-400 transition duration-200 me-2" onClick={() => dispatch(EMPTY_CART())}>
                                    Empty Cart
                                </button>
                                <Link to="/checkout">
                                    <button className={`mt-8 w-52 bg-orange-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-orange-400 transition duration-200  
                                        ${cartItems.length == 0 && 'opacity-75'}`}
                                        disabled={cartItems.length == 0 && "true"} onClick={() => handleCheckout()}>
                                        Checkout
                                    </button>
                                </Link></div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Cart
