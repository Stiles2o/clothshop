import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { filterbycategory, filterbyprice, selectCategory, selectFilter, selectPrice, selectSearch } from '../redux/filtter'
import { useLoaderData } from 'react-router-dom'

const Product = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const products = useLoaderData();
    const dispatch = useDispatch()

    const allcategories = Array.from(new Set(products.map(pro => pro.category)))
    const [category, setCategory] = useState('')
    const [sellingPrice, setPrice] = useState(0)

    useEffect(() => {
        dispatch(filterbycategory({ products, category }))
    }, [category])

    useEffect(() => {
        dispatch(filterbyprice({ products, sellingPrice }))
    }, [sellingPrice])

    const filterProduct = useSelector(selectFilter)
    const categoryvalue = useSelector(selectCategory)
    const priceval = useSelector(selectPrice)
    const searchval = useSelector(selectSearch)

    return (
        <>
            <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-4 relative">
                {/* Toggle Button */}
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden bg-orange-600 text-white hover:bg-orange-500 px-4 py-2 rounded-md mb-4">
                    {sidebarOpen ? "Hide Filtter" : "Show Filtter"}
                </button>

                {/* Sidebar */}
                <div className={`${sidebarOpen ? "block" : "hidden"} lg:block bg-white shadow-lg rounded-lg p-4 w-full lg:w-1/4 mb-6 lg:mb-0`}>
                    <h5 className="text-lg font-bold text-gray-800 mb-4">Categories</h5>
                    <ul className="space-y-3">
                        {allcategories.map((c, i) => (
                            <li key={i} className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    name="category"
                                    value={c}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
                                />
                                <label className="text-gray-700 font-medium">{c}</label>
                            </li>
                        ))}
                    </ul>

                    <h5 className="text-lg font-bold text-gray-800 mt-6 mb-4">Sort by Price</h5>
                    <div className="flex flex-col space-y-3">
                        <span className="text-sm text-gray-600">Price Range</span>
                        <input
                            type="range"
                            className="w-full accent-blue-600"
                            min="0"
                            max="800"
                            step="10"
                            value={sellingPrice}
                            onChange={(e) => setPrice(e.target.value)}
                            id="priceRange"
                        />
                        <span className="text-gray-700 font-medium">₹ {sellingPrice}</span>
                    </div>
                </div>

                {/* Product Display */}
                <div className="flex-grow bg-white shadow-lg rounded-lg p-4">
                    {(categoryvalue !== "" || priceval !== 0 || searchval !== "") ? (
                        <>
                            {filterProduct.length === 0 ? (
                                <div className="text-center text-gray-700 font-medium">
                                    No Product Found for "{categoryvalue}"
                                </div>
                            ) : (
                                <ProductCard products={filterProduct} />
                            )}
                        </>
                    ) : (
                        <ProductCard products={products} />
                    )}
                </div>
            </div>
        </>


    )
}

export default Product