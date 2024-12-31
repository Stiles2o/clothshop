import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectsliders, store_sliders } from '../redux/sliderSlice'
import { toast } from 'react-toastify'

const Carousel = () => {

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
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        setCurrentIndex(prevIndex => prevIndex == 0 ? sliders.length - 1 : prevIndex - 1)
    }
    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex == sliders.length - 1 ? 0 : prevIndex + 1)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex == sliders.length - 1 ? 0 : prevIndex + 1)
        }, 2000)

        return () => clearInterval(interval) //cleanup code 
    }, [sliders.length])

    return (
        <>

            <div className="relative w-full">
                <div className="flex overflow-hidden h-80 md:h-screen sm:h-[50vh] relative">
                    {sliders.map((s, i) =>
                        <div key={i} className={`w-full flex-shrink-0 transition-transform duration-500 
        ${currentIndex == i ? 'block' : 'hidden'}`}  >
                            <img
                                src={s.image} alt={s.name}
                                className="w-full h-full object-cover"
                            />
                            {currentIndex == i &&
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2  ms-5 bg-opacity-75 text-white p-4 rounded-lg">
                                    <h2 className="text-xl font-bold">{s.name}</h2>
                                    <p className="text-sm mt-2">{s.description}</p>
                                </div>}
                        </div>)}

                </div>

                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600" onClick={handlePrev} > &#8249;</button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600" onClick={handleNext}>  &#8250;  </button>


            </div>

        </>
    )
}

export default Carousel
