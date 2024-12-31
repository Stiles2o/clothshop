import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectRole } from "../redux/authSlice"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export const ShowonLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(isLoggedIn){
        return children
    }else {
        return null
    }
}

export const ShowonLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(!isLoggedIn){
        return children
    }else {
        return null
    }
}

export const ProtectedAdmin= ({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const role = useSelector(selectRole)
    if(isLoggedIn && role=="0"){return children}
    else return <Navigate to='/login' replace={true}/>
}

export const Protected = ({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const role = useSelector(selectRole)
    if(isLoggedIn && role=="1"){return children}
    else return <Navigate to='/login' replace={true}/>
}

export const saveorder =({userId,shippingAddress,cartItems,total,status,paymentMethod,email})=>{
    let order= async()=>{
        try{
            await axios.post(`${import.meta.env.VITE_BASE_URL}/orders`,{userId,shippingAddress,cartItems,total,status,paymentMethod,createdAt:new Date(),orderDate:new Date().toLocaleDateString() , email,orderTime:new Date().toLocaleTimeString()})
            toast.success("order placed")
        }
        catch(err){toast.error(err)}
    }
    return order()
}

export const FetchOrder =async()=>{
        try{
           const res =  await fetch(`${import.meta.env.VITE_BASE_URL}/orders`)
           const data = await res.json()
            return data
        }
        catch(err){console.log(err)}
}

export const sendmail =({amount,email,name,payment,status})=>{
    let mail= async()=>{
        try{
            await axios.post(`${import.meta.env.VITE_NODE_URL}/sendmail`,{amount,email,name,payment,status})
            toast.success(res.data.message)
        }
        catch(err){toast.error(err.message)}
    }
    return mail()
}



