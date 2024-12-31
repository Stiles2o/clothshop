import React, { useEffect } from 'react'
// import Loader from '../Loader'
import Carousel from '../carousel/Carousel'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import Thankyou from '../admin/Thankyou'

const Home = () => {
    const products = useLoaderData()
    // console.log(products)

    // This is for refrence
    // let getDeta = async()=>{
    //     try{
    //         const res = await fetch(`http://localhost:4000`,{
    //             method:"post",
    //             headers:{'content-type':'application/json'},
    //             body:JSON.stringify({name:"Rohit"})
    //         })
    //         const data = await res.json()
    //         console.log(data)
    //     }
    //     catch(err){
    //         console.log("not found")
    //     }
    // }
    // useEffect(()=>{getDeta()},[])

    return (
        <div>
            <Carousel/>
            <ProductCard products={products} />
        </div>
    )
}

export default Home
