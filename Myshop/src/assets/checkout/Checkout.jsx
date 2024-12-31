import React, { useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { useDispatch, useSelector } from 'react-redux'
import { selectEmail, selectId } from '../redux/authSlice'
import { EMPTY_CART, selectCartItems, selectTotal } from '../redux/cartSlice'
import { saveorder, sendmail } from '../extrafile/hiddenlinks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PaymentForm from '../payment/PaymentForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { storecheckout } from '../redux/ChekoutSlice'

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK}`)

const Checkout = () => {

  const email = useSelector(selectEmail)
  const userId = useSelector(selectId)
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({ name: "", email: "", mobile: "", city: "", address: "", postalcode: "" })
  const [paymentMethod, setPaymentMethod] = useState('')

  const [clientsecret, setClientSecret] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(shippingAddress)
    let { name, email, mobile, city, address, postalcode } = shippingAddress
    if (!name || !email || !mobile || !city || !address || !postalcode || !paymentMethod) {
      toast.error("please fill all the fields"); return
    }

    dispatch(storecheckout(shippingAddress))

    if (paymentMethod == "cod") {
      saveorder({ userId, shippingAddress, cartItems, total, status: "In Progress", paymentMethod: "cod" })
      sendmail({amount:total,email,name:shippingAddress.name,payment:"cod",status:"In Progress"})
      dispatch(EMPTY_CART())
      navigate("/thankyou")

    }
    else if (paymentMethod == "online") {
      try {
        const res = await fetch(`${import.meta.env.VITE_NODE_URL}/create-payment-intent`, {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ amount: total })
        })
        const data = await res.json()
        // console.log(data.clientsecret)
        toast.success("Payment Initialized")
        setClientSecret(data.clientsecret)
      }
      catch (err) { toast.error(err.message) }
    }

  }

  return (
    <>
    <Elements stripe = {stripePromise}>
      <div className='grid grid-cols-1 sm:grid-cols-2 mx-14 mt-14 shadow-md p-5'>
        <CheckoutSummary />
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Checkout Details</h2>
          <hr className="border-gray-300 mb-6" />
          <form className="bg-white shadow-md rounded-lg p-6 space-y-6" onSubmit={handleSubmit}>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={shippingAddress.mobile}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  placeholder="Enter address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalcode" className="block text-gray-700 font-medium mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalcode"
                  value={shippingAddress.postalcode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalcode: e.target.value })}
                  placeholder="Enter postal code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-700 mb-4">Payment Method</p>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    onChange={(e) => setPaymentMethod("cod")}
                    checked={paymentMethod === "cod"}
                    className="h-5 w-5 text-orange-600 border-gray-300 focus:ring-orange-400"
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    onChange={(e) => setPaymentMethod("online")}
                    checked={paymentMethod === "online"}
                    className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Pay Online</span>
                </label>
              </div>

            </div>

            {/* Paymentform */}
            {(paymentMethod == "online" && clientsecret)
              &&
              <div>
                <PaymentForm clientsecret={clientsecret} />
              </div>
            }

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-400 transition duration-200"
              >
                Place Order
              </button>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-400 transition duration-200"
              >
                Cancel
              </button>
            </div>

          </form>


        </div>
      </div>
      </Elements>
    </>
  )
}

export default Checkout
