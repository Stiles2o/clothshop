import React from 'react'
import {FaHome, FaList } from 'react-icons/fa'
import { FaLaptopFile, FaPenFancy } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <div className='w-20 sm:w-64 h-full bg-gray-800 text-white flex flex-col'>
        <div className='flex items-center justify-center h-16 text-2xl font-bold'>
            <span className='hidden sm:block'>Admin Panel</span>
        </div>
        <nav className='flex flex-col mt-4'>
            <Link to="/admin" className='flex items-center p-4 hover:bg-gray-700'>
                <FaHome className="mr-0 sm:mr-3" ></FaHome>
                <span className="hidden sm:block">Dashboard</span>
            </Link>
            <Link to="/admin/category/view" className='flex items-center p-4 hover:bg-gray-700'>
                <FaList className="mr-0 sm:mr-3" ></FaList>
                <span className="hidden sm:block">View Category</span>
            </Link>
            <Link to="/admin/category/add" className='flex items-center p-4 hover:bg-gray-700'>
                <FaPenFancy className="mr-0 sm:mr-3" ></FaPenFancy>
                <span className="hidden sm:block">Add Category</span>
            </Link>
            <Link to="/admin/product/view" className='flex items-center p-4 hover:bg-gray-700'>
                <FaList className="mr-0 sm:mr-3" ></FaList>
                <span className="hidden sm:block">View Products</span>
            </Link>
            <Link to="/admin/product/add" className='flex items-center p-4 hover:bg-gray-700'>
                <FaPenFancy className="mr-0 sm:mr-3" ></FaPenFancy>
                <span className="hidden sm:block">Add Products</span>
            </Link>
            <Link to="/admin/slider/view" className='flex items-center p-4 hover:bg-gray-700'>
                <FaList className="mr-0 sm:mr-3" ></FaList>
                <span className="hidden sm:block">View Slider</span>
            </Link>
            <Link to="/admin/orders" className='flex items-center p-4 hover:bg-gray-700'>
                <FaLaptopFile className="mr-0 sm:mr-3" ></FaLaptopFile>
                <span className="hidden sm:block">Orders</span>
            </Link>
            {/* <Link to="/admin/slider/add" className='flex items-center p-4 hover:bg-gray-700'>
                <FaPenFancy className="mr-0 sm:mr-3" ></FaPenFancy>
                <span className="hidden sm:block">Add Slider</span>
            </Link> */}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
