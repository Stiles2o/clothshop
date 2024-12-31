import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotal } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems)
    const total = useSelector(selectTotal)
    return (
        <>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md ">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Checkout Summary</h2>
                <hr className="border-gray-300 mb-6" />

                <ul className="space-y-4">
                    {cartItems.map((cart, index) => (
                        <li className="border border-gray-200 bg-white p-4 rounded-lg flex gap-2 shadow-sm justify-between" key={index}>
                            <div>
                                <p className="text-lg font-semibold text-gray-700">{cart.name}</p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">Price:</span> ₹ {cart.sellingPrice}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">Quantity:</span> {cart.qty}
                                </p>
                                {cart.qty > 1 && (
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-800">Total Price:</span> ₹{" "}
                                        {cart.qty * cart.sellingPrice}
                                    </p>
                                )}
                            </div>
                            <div>
                                <img src={cart.images} alt={cart.name} className="w-20 h-20 object-cover rounded-lg " />
                            </div>

                        </li>
                    ))}

                    <li className="border border-gray-200 bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                        <span className="text-lg font-medium text-gray-700">Total:</span>
                        <span className="text-lg font-bold text-black-600">₹ {total}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CheckoutSummary
