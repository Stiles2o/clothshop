import React from 'react'
import AdminHeader from './AdminHeader'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
  return (
    <>
    <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true}
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false}
        draggable pauseOnHover={false} theme="colored" />
    <div className='flex h-screen'><Sidebar/>
        <div className='flex flex-col flex-grow'><AdminHeader/>
            <main className='p-6 bg-gray-50 flex-grow overflow-y-auto'><Outlet/></main>
        </div>
    </div>
      
      
    </>
  )
}

export default AdminLayout
