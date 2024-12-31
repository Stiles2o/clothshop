import React, { useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShowonLogin, ShowonLogout } from '../extrafile/hiddenlinks'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_USER, selectUsername } from '../redux/authSlice'
import { selectCartItems } from '../redux/cartSlice'
import { filterbysearch } from '../redux/filtter'
import { FatechProducts } from '../FatechProducts'
import { selectProducts, store_products } from '../redux/productSlice'

const Navbar = () => {
    const redirect = useNavigate()
    const dispatch = useDispatch()
    
    const loggedInUser = useSelector(state => state.auth.user); 


    // const [username, setUsername] = useState('')
    const navigation = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Products', to: '/products' },
        { name: 'Contact Us', to: '/contect' },
    ]
    const handleDelete = () => {
        dispatch(LOGOUT_USER())
        toast.success("Logout Successfully")
        redirect('/')
    }

    const username = useSelector(selectUsername)
    const cartItems = useSelector(selectCartItems)

    const [search, setSearch] = useState('')
    useEffect(() => {
        FatechProducts().then((res) => {
            // console.log(res);
            dispatch(store_products(res))
        })
    }, [])
    const products = useSelector(selectProducts)

    useEffect(() => {
        dispatch(filterbysearch({ products, search }))
    }, [search])

    return (
        <>
            <Disclosure as="nav" className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Mobile Menu Button */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-200">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
                            </Disclosure.Button>
                        </div>

                        {/* Logo and Navigation */}
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex items-center">
                                <img
                                    className="h-10 w-auto animate-pulse"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                                <span className="ml-2 text-white text-xl font-bold tracking-wide">BrandName</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Search and Profile Section */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Search Bar */}
                            <input
                                type="text"
                                className="hidden sm:block mr-4 rounded-lg p-2 text-gray-700 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 transition duration-200"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* Login/Logout Buttons */}
                            <ShowonLogout>
                                <NavLink
                                    to="/login"
                                    className="rounded-full bg-gray-800 text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition duration-200"
                                >
                                    Login
                                </NavLink>
                            </ShowonLogout>
                            <ShowonLogin>
                                <Link
                                    to="/cart"
                                    className="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                                >
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full absolute -top-2 -right-2">
                                        {cartItems.length}
                                    </span>
                                </Link>

                                {/* Profile Dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200">
                                        <UserCircleIcon className="h-8 w-8 text-white" />
                                        <span className="ml-2 text-white font-medium m-2">{username}</span>
                                    </Menu.Button>
                                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-transform transform duration-300 ease-in-out">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                to={{
                                                    pathname: "/register",
                                                    state: { user: loggedInUser } // Pass the logged-in user data as state
                                                  }}
                                                    className={`block px-4 py-2 text-sm rounded-md transition-all duration-300 ease-in-out ${active ? "bg-orange-600 text-white transform scale-105" : "text-gray-700 hover:bg-indigo-100 hover:text-gray-900"}`}
                                                >
                                                    Your Profile
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to="/myorders"
                                                    className={`block px-4 py-2 text-sm rounded-md transition-all duration-300 ease-in-out ${active ? "bg-orange-600 text-white transform scale-105" : "text-gray-700 hover:bg-indigo-100 hover:text-gray-900"}`}
                                                >
                                                    My Orders
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    type="button"
                                                    onClick={handleDelete}
                                                    className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-all duration-300 ease-in-out ${active ? "bg-orange-600 text-white transform scale-105" : "text-gray-700 hover:bg-indigo-100 hover:text-gray-900"}`}
                                                >
                                                    Sign Out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>

                                </Menu>
                            </ShowonLogin>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition duration-200"
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </Disclosure.Panel>
            </Disclosure>

        </>
    )
}

export default Navbar
