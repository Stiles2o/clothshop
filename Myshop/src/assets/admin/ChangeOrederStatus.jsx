import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { sendmail } from '../extrafile/hiddenlinks'

const ChangeOrederStatus = ({id,status,order}) => {
    const navigate = useNavigate()
    const [ostatus,setOStatus] = useState(status)
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/orders/${id}`,{...order,status:ostatus,createdAt:order.createdAt,editedAt:new Date()})

            // sendmail({amount:order.total,email:order.email,name:order.shippingAddress.name,payment:order.paymentMethod,status:ostatus})
            
            toast.success("order status updated")
            navigate('/admin/orders')
        }
        catch(err){toast.error(err)}
    }
  return (
    <>
    <h3 className="text-lg font-bold mb-4">Update Order Status</h3>
    <hr className="mb-4" />
    <form onSubmit={handleSubmit}>
        <div className="mb-4 max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
                Status
            </label>
            <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={ostatus} onChange={(e)=>setOStatus(e.target.value)}
                id="status"
            > 
                <option>Placed</option>
                <option>Shipped</option>
                <option>Cancelled</option>
                <option>Delivered</option>
                <option>Processing</option>
                <option>In Progress</option>
            </select>
            <button
                type="submit"
                className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
                Update
            </button>
        </div>
    </form>
</>
  )
}

export default ChangeOrederStatus
