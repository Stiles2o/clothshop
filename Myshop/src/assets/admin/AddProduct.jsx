import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectCategories, store_categories } from '../redux/categorySlice'
import { toast } from 'react-toastify'
import { selectProducts } from '../redux/productSlice'

const AddProduct = () => {
  const obj ={  name: "", category: "", brand: "", stock: 0, sellingPrice: 0, originalPrice: 0, images:[],
    description: ""}
  const redirect = useNavigate()
  const [product, setProduct] = useState({...obj})
  const [picloading,setPicLoading] =useState(false)
  const [pics,setPics] =useState([])
  const dispatch = useDispatch()
  let getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/categorys`)
      dispatch(store_categories(res.data))
    }
    catch (err) { toast.error(err.message) }
  }
  useEffect(() => {getData()}, [])
  const categories = useSelector(selectCategories)

  //edit
  const {id} = useParams()
  const allproducts  =  useSelector(selectProducts)
  const productEdit = allproducts.find(item=>item.id == id)
  useEffect(()=>{
    if(id){setProduct(productEdit);setPics(productEdit.images)}
    else setProduct({...obj})
  },[id])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  };

  const handleImageChange = async(e) => {
    // console.log(e.target.files)
    let images  =  Array.from(e.target.files)
    // console.log(images)
    if(images.length==0){toast.error("please choose image");return}
      let uploadImages = []
    // console.log(uploadImages)
    for(let img of images){
      setPicLoading(true)
      if(['image/jpg','image/jpeg','image/gif','image/png','image/jfif','image/webp'].includes(img.type)){
        const data = new FormData()
        data.append('file',img)
        data.append('cloud_name','rohitj')
        data.append('upload_preset','myshop')
        data.append('folder','products')
          try{
           const res =  await axios.post("https://api.cloudinary.com/v1_1/rohitj/image/upload", data)
          //  console.log(res.data.url)
          uploadImages.push(res.data.url)
           setPicLoading(false)
        }
        catch(err){toast.error(err.message);    
          setPicLoading(false)}
      }
      else {toast.error("invalid image");
        setPicLoading(false)}
    }
   setPics(prevImg=>[...prevImg,...uploadImages])
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!product.name || !product.category|| !product.brand || !product.stock || !product.sellingPrice || !product.originalPrice){
      toast.error("please fill the fields");return }
      else{
        if(!id){
          try{
            await axios.post(`${import.meta.env.VITE_BASE_URL}/products`,{...product,images:pics,createdAt:new Date()})
            toast.success("product added")
            redirect('/admin/product/view')
          }
          catch(err){toast.error(err.message)}
        }
        else {
          try{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${id}`,{...product,images:pics,createdAt:product.created,
              editedAt:new Date()})
            toast.success("product updated")
            redirect('/admin/product/view')
          }
          catch(err){toast.error(err.message)}
        }
      }
  
  };

  const removeimage=(index)=>{
    setPics(prevImg=>prevImg.filter((img,i)=>i!==index))
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{id ? "Edit " : "Add "} Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                placeholder="Enter brand name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label
                htmlFor="sellingPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Selling Price
              </label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleInputChange}
                placeholder="Enter selling price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            <div>
              <label
                htmlFor="originalPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Original Price
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={product.originalPrice}
                onChange={handleInputChange}
                placeholder="Enter original price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange} multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {id && pics.length != 0 ? <>
            {pics.map((img, index) => <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
              <img src={img} style={{ height: '100px', width: '100px' }} />
              <span style={{
                position: 'absolute', top: '-5px', right: '0', background: 'red', color: 'white', padding: '1px 5px',
                borderRadius: '5px', cursor: 'pointer'
              }} onClick={() => removeimage(index)}>X</span>
            </div>)}</>
            : ''
          }
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {picloading ?
              <>
                <span className="inline-block h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></span>

              </>
              : <>{id ? "Update" : "Submit"}</>}
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
