import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { selectId } from '../redux/authSlice'
import ReactPaginate from 'react-paginate'
import { Link, useLoaderData } from 'react-router-dom'
import { store_orders } from '../redux/orderSlice'

const MyOreders = () => {
// Method 1
    // const dispatch = useDispatch()
    // let getData = async () => {
    //     try {
    //         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders`)
    //         dispatch(store_orders(res.data))
    //     }
    //     catch (err) { toast.error(err.message) }
    // }
    // useEffect(() => { getData() }, [])

    // const allorders = useSelector(selectorders)
    // console.log(allorders)
// Method 2
    const allorders = useLoaderData()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(store_orders(allorders))
    },[])
    const userId = useSelector(selectId)
    const orders = allorders.filter(item => item.userId == userId)

    return (
        <div className="max-w-7xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">My Orders</h1>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Order Id
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
                        {orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No Order Found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className={`border-b ${index % 2 !== 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.orderDate} at {order.orderTime}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.total}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.paymentMethod}
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-sm ${order.status !== "Delivered"
                                                ? "text-red-500"
                                                : "text-green-500"
                                            }`}
                                    >
                                        {order.status}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-orange-600">
                                        <Link to={`/myorders/${order.id}`} className="hover:underline">View</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default MyOreders
