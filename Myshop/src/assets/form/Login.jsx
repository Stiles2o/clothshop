import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import { useDispatch } from 'react-redux'
import { LOGIN_USER } from '../redux/authSlice'
import { EyeIcon } from '@heroicons/react/24/outline'
import { FiEyeOff } from 'react-icons/fi'

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)
    const redirect = useNavigate()
    const dispatch = useDispatch()
    const redirectURL = location.state ? location.state.to : '/'
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!user.email || !user.password) { toast.error("invalid credentials"); return }
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users?email=${user.email}`)
            const data = await res.json()
            if (data[0].password == user.password) {
                if (data[0].role == "0") {
                    redirect('/admin')
                } else if (data[0].role == '1') {
                    // redirect('/')
                    redirect(redirectURL)
                }
                let obj = { isLoggedIn: true, username: data[0].username, email: data[0].email, id: data[0].id, role: data[0].role }
                
                sessionStorage.setItem("shoplogin",JSON.stringify(obj))
                dispatch(LOGIN_USER(obj))
                toast.success("loggedIn Successfully")
                setIsLoading(false)
            }
            else { toast.error("invalid credentials"); setIsLoading(false) }
        }
        catch (err) { toast.error(err.message) }
        setIsLoading(false)
    }
    return (
        <>
            {isLoading && <Loader />}
            <div className="flex justify-center items-center mt-7">
                <form
                    className="w-full max-w-md mt-10 bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                    onSubmit={handleSubmit}
                >
                    <h1 className="block text-2xl font-extrabold text-center mb-7 text-indigo-800 animate-pulse">
                        Login
                    </h1>

                    {/* Email Field */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border py-2 px-3 text-gray-800 rounded-md focus:ring-2 focus:outline-none focus:ring-indigo-600 focus:shadow-lg focus:shadow-indigo-500 transition duration-200"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-5 relative">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="w-full border py-2 px-3 text-gray-800 rounded-md focus:ring-2 focus:outline-none focus:ring-indigo-600 focus:shadow-lg focus:shadow-indigo-500 transition duration-200"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                        />
                        {/* Eye Icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/10 text-gray-600"
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-6 w-6" />
                            ) : (
                                <EyeIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-pink-400 transition duration-300 transform hover:-translate-y-1"
                    >
                        Login
                    </button>

                    {/* Create Account Link */}
                    <div className="mt-5 text-center">
                        <Link
                            to="/register"
                            className="text-indigo-800 font-medium hover:underline hover:text-indigo-600 transition duration-300 animate-bounce"
                        >
                            Create Account?
                        </Link>
                    </div>
                </form>
            </div>
        </>


    )
}

export default Login

