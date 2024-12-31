import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectorders } from '../redux/orderSlice';
import { FaArrowCircleLeft } from 'react-icons/fa';
import ChangeOrederStatus from './ChangeOrederStatus';

const OrederDetailes = () => {
  const { id } = useParams();
  const allorders = useSelector(selectorders);
  const order = allorders.find(order => order.id == id);
  // console.log(order)
  return (
    <div className="container mx-auto shadow-lg mt-4 p-4 bg-white rounded">
      <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
      <hr className="mb-4" />
      <div className="mb-4">
        <Link to="/admin/orders" className="flex w-48 items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          <FaArrowCircleLeft />
          Back to Orders
        </Link>
      </div>

      {order == null ? (
        <>
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-blue-500 rounded-full mr-4" role="status"></div>
            <div className="spinner-grow animate-ping w-8 h-8 bg-blue-500 rounded-full" role="status"></div>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-lg font-semibold text-blue-500 mb-4">Order Status: {order.status}</h4>
          <div className="mb-4">
            <b>Shipping Address</b><br />
            <p>
              Name:{order.shippingAddress.name}<br />
              Mobile No:{order.shippingAddress.mobile}<br />
              Address: {order.shippingAddress.address}, {order.shippingAddress.city} <br />
              Pincode: {order.shippingAddress.postalcode}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Sr. No</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-4">No Items in Cart</td>
                  </tr>
                )}
                {order.cartItems.map((c, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{c.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img src={c.images[0]} alt={c.name} className="h-12 w-12 object-cover rounded" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">${c.sellingPrice}</td>
                    <td className="border border-gray-300 px-4 py-2">{c.qty}</td>
                    <td className="border border-gray-300 px-4 py-2">${c.qty * c.sellingPrice}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2 font-semibold text-right">Total Amount:</td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">${order.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {order.status != 'Delivered' && <ChangeOrederStatus id={id} status={order?.status} order={order} />}

    </div>
  )
}

export default OrederDetailes
