import { toast } from "react-toastify"

export const FatechProducts = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products`)
        const data = await res.json()
        return data;
    }
    catch (err) { toast.error(err.message) }
}
