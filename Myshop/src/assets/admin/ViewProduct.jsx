import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/productSlice'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'

const ViewProduct = () => {
    const dispatch = useDispatch()
    let getData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
            dispatch(store_products(res.data))
        }
        catch (err) { toast.error(err.message) }
    }
    useEffect(() => { getData() }, [])

    const products = useSelector(selectProducts)
    //   console.log(products)

    const handleDelete = async (id) => {
        if (window.confirm("are you sure to delete this?")) {
            try {
                const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
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
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset); //4
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(products.length / itemsPerPage))
    }, [itemOffset, products])

    return (
        <>
            <div className="max-w-4xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>
                <div className="overflow-x-auto mb-3">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Sr. No
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length == 0 &&
                                <tr>  <td colSpan="6"
                                    className="px-6 py-4 text-center text-sm text-gray-500"  >
                                    No Products added. </td> </tr>}
                            {currentItems.map((product, index) =>
                                <tr key={index}
                                    className={`border-b ${index % 2 != 0 ? "bg-gray-50" : "bg-white"
                                        }`} >
                                    <td className="px-6 py-4 text-sm text-gray-700"> {index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700"> {product.category}  </td>
                                    <td className="px-6 py-4 text-sm text-gray-700"> {product.name}  </td>
                                    <td className="px-6 py-4 text-sm">
                                        <img src={product.images[0]} alt={product.name}
                                            className="w-16 h-16 object-cover rounded" />
                                        {/* {console.log(product)} */}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        ₹{product.sellingPrice} </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {product.stock} </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <Link to={`/admin/product/edit/${product.id}`}>
                                            <button type="button" className='me-2 text-orange-400 p-3 rounded-md '><FaPenAlt /></button></Link>
                                        <button type="button" className='me-2 text-red-400 p-3 rounded-md ' onClick={() => handleDelete(product.id)}><FaTrashAlt /></button>
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
        </>
    )
}

export default ViewProduct
