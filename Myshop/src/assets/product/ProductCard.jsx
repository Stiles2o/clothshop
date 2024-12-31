import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART } from '../redux/cartSlice'
import ReactPaginate from 'react-paginate'

const ProductCard = ({ products }) => {
    const dispatch = useDispatch()
    const handleCart = (product) => {
        dispatch(ADD_TO_CART(product))
        window.scrollTo(0, 0)
    }

    let itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(products.length / itemsPerPage))
    }, [itemOffset, products])

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers Also Purchased</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-7">
                        {products.length === 0 && <Loader />}
                        {currentItems.map((product) => (
                            <div
                                key={product.id}
                                className="group relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                            >
                                {/* Product Image */}
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-80">
                                    <img
                                        alt={product.name}
                                        src={product.images[0]}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:opacity-90"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="p-4 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition duration-200">
                                                {product.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">₹{product.sellingPrice}</p>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-orange-500 transition-all duration-200 transform hover:-translate-y-1"
                                        onClick={() => handleCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName="isolate flex -space-x-px rounded-md shadow-sm justify-center"
                        pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-600 focus:z-20 focus:outline-offset-0"
                        activeClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        previousClassName="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        nextClassName="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    />
                </div>
            </div>

        </>
    )
}

export default ProductCard
