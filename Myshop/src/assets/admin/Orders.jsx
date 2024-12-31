import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../redux/orderSlice'
import { Link, useLoaderData } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const Orders = () => {
    const allorders = useLoaderData()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(store_orders(allorders))
    },[])

    const orders = useSelector(selectorders)
    // console.log(orders)

    return (
        <div className="max-w-7xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg" >
            <div className="overflow-x-auto mb-3">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Order Id
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                User Id
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Order Date and Time
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Total Amount
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Payment Mode
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length == 0 &&
                            <tr>  <td colSpan="7"
                                className="px-6 py-4 text-center text-sm text-gray-500"  >
                                No Order Found. </td> </tr>}
                        {orders.map((order, index) =>
                            <tr key={index}
                                className={`border-b ${index % 2 != 0 ? "bg-gray-50" : "bg-white"
                                    }`} >
                                <td className="px-6 py-4 text-sm text-gray-700"> {order.id}  </td>
                                <td className="px-6 py-4 text-sm text-gray-700"> {order.userId}  </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {order.orderDate} at {order.orderTime}</td>

                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {order.total} </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {order.paymentMethod}
                                </td>
                                <td className={`px-6 py-4 text-sm text-gray-700 ${order.status != 'Delivered' ? 'text-red-500' : 'text-green-500'}`}>
                                    {order.status} </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Link to={`/admin/orders/${order.id}`}>
                                        <button type="button" className='me-2 text-orange-400 p-3 rounded-md '>View</button></Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Orders
