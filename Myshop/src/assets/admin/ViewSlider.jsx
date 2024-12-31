import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectsliders, store_sliders } from '../redux/sliderSlice'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'

const ViewSlider = () => {

    const dispatch = useDispatch()
    let getData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/sliders`)
            dispatch(store_sliders(res.data))
        }
        catch (err) { toast.error(err.message) }
    }
    useEffect(() => { getData() }, [])

    const sliders = useSelector(selectsliders)

    const handleDelete = async (id) => {
        if (window.confirm("are you sure to delete this??")) {
            try {
                const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/sliders/${id}`)
                getData()
            }
            catch (err) { toast.error(err.message) }
        }

    }

    let itemsPerPage = 5
    const [itemOffset, setItemOffset] = useState(0)
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % sliders.length;
        setItemOffset(newOffset); //4
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(sliders.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(sliders.length / itemsPerPage))
    }, [itemOffset, sliders])

    return (
        <>

            <div className="max-w-4xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between ">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">sliders </h2>
                    <Link className='text-xl font-bold mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' to='/admin/slider/add'>Add</Link></div>
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
                            {sliders.length == 0 &&
                                <tr>  <td colSpan="3"
                                    className="px-6 py-4 text-center text-sm text-gray-500"  >
                                    No sliders added. </td> </tr>}
                            {currentItems.map((slider, index) =>
                                <tr key={index}
                                    className={`border-b ${index % 2 != 0 ? "bg-gray-50" : "bg-white"
                                        }`} >
                                    <td className="px-6 py-4 text-sm text-gray-700"> {slider.name}  </td>
                                    <td className="px-6 py-4 text-sm">
                                        <img src={slider.image} alt={slider.name}
                                            className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {slider.description} </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <Link to={`/admin/slider/edit/${slider.id}`}>
                                            <button type="button" className='me-2 text-orange-400 p-3 rounded-md '><FaPenAlt /></button></Link>
                                        <button type="button" className='me-2 text-red-400 p-3 rounded-md ' onClick={() => handleDelete(slider.id)}><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="isolate flex -space-x-px rounded-md shadow-sm justify-center"
                    pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0"
                    activeClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    previousClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    nextClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                />
            </div>

        </>
    )
}

export default ViewSlider
