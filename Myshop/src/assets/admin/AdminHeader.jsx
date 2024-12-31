import React from 'react'
import { useDispatch } from 'react-redux'
import { LOGOUT_USER } from '../redux/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const dispatch = useDispatch() 
  const redirect =useNavigate()
  const handleDelete = () => {
    dispatch(LOGOUT_USER())
    toast.success("Logout Successfully")
    redirect('/')
}
  return (
    
    <header className='flex items-center justify-between h-16 bg-gray-100 px-6 shadow-md'>
        <h1 className='text-xl font-semibold'>WelCome Admin</h1>
        <div className='flex items-center space-x-4'>
            <span className='text-gray-700'>Admin</span>
            <button className='px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-300'onClick={handleDelete}>Log Out</button>
        </div>
      
    </header>
  )
}

export default AdminHeader
