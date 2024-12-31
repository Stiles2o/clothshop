import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCategories } from "../redux/categorySlice";

const AddCategory = () => {
    const [category, setCategory] = useState({ name: "", image: null, description: "" });
    const [picloading, setPicLoading] = useState(false)
    const redirect = useNavigate()

    //edit   
    const { id } = useParams()
    const categories = useSelector(selectCategories)
    const categoryEdit = categories.find(item => item.id == id)
    useEffect(() => {
        if (id) { setCategory(categoryEdit) }
        else setCategory({ name: "", image: null, description: "" })
    }, [id])

    // Image upload 
    const handleImageChange = async (e) => {
        let img = e.target.files[0]
        setPicLoading(true)
        if (img == undefined) { toast.error("please choose image"); return }
        if (['image/jpg', 'image/jpeg', 'image/gif', 'image/png', 'image/jfif', 'image/webp'].includes(img.type)) {
            const data = new FormData()
            data.append('file', img)
            data.append('cloud_name', 'rohitj')
            data.append('upload_preset', 'myshop')
            data.append('folder', 'categories')
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/rohitj/image/upload", data)
                //  console.log(res.data.url)
                setCategory({ ...category, image: res.data.url })
                setPicLoading(false)
            }
            catch (err) { toast.error(err.message); setPicLoading(false) }
        }
        else { toast.error("invalid image"); setPicLoading(false) }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) { //add
            try {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/categorys`, { ...category, createdAt: new Date() })
                toast.success("category added")
                redirect('/admin/category/view')
            }
            catch (err) { toast.error(err.message) }
        }
        else {//update
            try {
                await axios.put(`${import.meta.env.VITE_BASE_URL}/categorys/${id}`, { ...category, createdAt: category.createdAt, editedAt: new Date() })
                toast.success("category updated")
                redirect('/admin/category/view')
            }
            catch (err) { toast.error(err.message) }
        }

    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{id ? "Edit " : "Add "} Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter category name"
                    />
                </div>
                <div>
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="image"
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {id && <img src={category.image} className="h-16 w-16" />}
                <div>
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={category.description}
                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Enter category description"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center">
                    {picloading ?
                        <>
                            <span className="inline-block h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>

                        </>
                        : <> {id ? "Update" : "Submit"}</>}
                </button>
            </form>
        </div>
    );
};

export default AddCategory;
