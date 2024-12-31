import { EyeIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { FiEyeOff } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
    // console.log(import.meta.env.VITE_BASE_URL)
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const [user, setUser] = useState({ username: '', email: '', password: '', cpassword: '', role: '1' })
    const redirect = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user.username || !user.email || !user.password || !user.cpassword) { toast.error("please fill all the fields"); return }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) { toast.error("Invalid Email"); return }

        const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (user.password.length < 8) {
            toast.error("At Least 8 Characters");
            return;
        }

        if (!passwordStrengthRegex.test(user.password)) {
            alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).");
            toast.error("Enter Strong Password")
            return;
        }

        if (user.password != user.cpassword) { toast.error("password not match"); return }
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ ...user, createdAt: new Date() })
            })
            toast.success("registered successfully")
            redirect('/login')
        }
        catch (err) { toast.error(err.message) }
    }


    return (
        <>
            <div className="flex justify-center items-center mt-7">
                <form
                    className="w-full max-w-md mt-7 bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                    onSubmit={handleSubmit}
                >
                    <h1 className="block text-2xl font-extrabold text-center mb-7 text-indigo-800 animate-pulse">
                        Register
                    </h1>

                    {/* Username Field */}
                    <div className="mb-5">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            className="w-full border py-2 px-3 text-gray-800 rounded-md focus:ring-2 focus:outline-none focus:ring-indigo-600 focus:shadow-lg focus:shadow-indigo-500 transition duration-200"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required
                        />
                    </div>

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
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password input types
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

                    {/* Confirm Password Field */}
                    <div className="mb-5 relative">
                        <label htmlFor="cpassword" className="block text-gray-700 font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="cpassword"
                            type={showCPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className="w-full border py-2 px-3 text-gray-800 rounded-md focus:ring-2 focus:outline-none focus:ring-indigo-600 focus:shadow-lg focus:shadow-indigo-500 transition duration-200"
                            value={user.cpassword}
                            onChange={(e) => setUser({ ...user, cpassword: e.target.value })}
                            required
                        />
                        {/* Eye Icon */}
                        <button
                            type="button"
                            onClick={() => setShowCPassword(!showCPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/10 text-gray-600"
                        >
                            {showCPassword ? (
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
                        Register
                    </button>
                </form>
            </div>
        </>

    )
}

export default Register