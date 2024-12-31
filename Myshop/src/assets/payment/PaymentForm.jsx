import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { toast } from 'react-toastify'
import { EMPTY_CART, selectCartItems, selectTotal } from '../redux/cartSlice'
import { saveorder, sendmail } from '../extrafile/hiddenlinks'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectEmail, selectId } from '../redux/authSlice'
import { selectShippingAddress } from '../redux/ChekoutSlice'


const PaymentForm = ({ clientsecret }) => {
  const stripe = useStripe()
  const elements = useElements()

  const userId = useSelector(selectId)
  const email = useSelector(selectEmail)
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectTotal)
  const shippingAddress = useSelector(selectShippingAddress)

  // if (!userId || !email || !cartItems || !total || !shippingAddress) {
  //   return <p>Loading...</p>; // Or handle missing data gracefully
  // }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe is not initialized");
      return
    }
    try {
      const cardelement = elements.getElement(CardElement)
      await stripe.confirmCardPayment(clientsecret, {
        payment_method: { card: cardelement }
      }).then((result) => {
        // console.log(result)
        if (result.paymentIntent.status == "succeeded") {
          toast.success("payment done")
         //save order
          saveorder({ userId, shippingAddress, cartItems, total, status: "In Progress", paymentMethod: "online" })
          sendmail({ amount: total, email, name: shippingAddress.name, payment: "online", status: "In Progress" })
          dispatch(EMPTY_CART())
          navigate('/thankyou')
        }
        else if (result.error) { toast.error("payment failed") }

      })

    }
    catch (err) {
      //     console.log(err)
      toast.error("An error occured during payment")
    }
  }
  return (
    <div className='mt-5'>
      <CardElement className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></CardElement>
      <div className="flex justify-center mt-8">
        <button
          type="button" onClick={handleSubmit}
          className="w-full sm:w-auto px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-400 transition duration-200"
        >
          Pay Now
        </button>
      </div>
    </div>
  )
}

export default PaymentForm
