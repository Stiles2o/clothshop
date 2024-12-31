import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { selectCategories, store_categories } from '../redux/categorySlice'

const ViewCategory = () => {
    const dispatch = useDispatch()
    let getData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/categorys`)
            dispatch(store_categories(res.data))
        }
        catch (err) { toast.error(err.message) }
    }
    useEffect(() => { getData() }, [])

      const categories = useSelector(selectCategories)

    const handleDelete = async (id) => {
        if (window.confirm("are you sure to delete this?")) {
            try {
                const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/categorys/${id}`)
                getData()
            }
            catch (err) { toast.error(err.message) }
        }

    }

    let itemsPerPage = 5
    const [itemOffset, setItemOffset] = useState(0)
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)

      const handlePageClick = (event) => {    const newOffset = (event.selected * itemsPerPage) % categories.length; 
    setItemOffset(newOffset); //4
      };

      useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage; 
        setCurrentItems(categories.slice(itemOffset, endOffset)) 
        setPageCount(Math.ceil(categories.length / itemsPerPage)) 
      },[itemOffset,categories])
    return (
        <div className="max-w-4xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Categories</h2>
            <div className="overflow-x-auto mb-3">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length == 0 &&
                            <tr>  <td colSpan="3"
                                className="px-6 py-4 text-center text-sm text-gray-500"  >
                                No categories added. </td> </tr>}
                        {currentItems.map((category, index) =>
                            <tr key={index}
                                className={`border-b ${index % 2 != 0 ? "bg-gray-50" : "bg-white"
                                    }`} >
                                <td className="px-6 py-4 text-sm text-gray-700"> {category.name}  </td>
                                <td className="px-6 py-4 text-sm">
                                    <img src={category.image} alt={category.name}
                                        className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {category.description} </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Link to={`/admin/category/edit/${category.id}`}>
                                        <button type="button" className='me-2 text-orange-400 p-3 rounded-md '><FaPenAlt /></button></Link>
                                    <button type="button" className='me-2 text-red-400 p-3 rounded-md ' onClick={() => handleDelete(category.id)}><FaTrashAlt /></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="isolate flex -space-x-px rounded-md shadow-sm justify-center"
                pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0"
                activeClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                previousClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                nextClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            />
        </div>
    );
}

export default ViewCategory
