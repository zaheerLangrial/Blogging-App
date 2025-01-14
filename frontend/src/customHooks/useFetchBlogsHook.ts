'use client'
import axios from "axios";
import { useEffect, useState } from "react";


export interface Product_Type {
    id: number;
    name: string;
    description: string;
    image: string;
    author: number;
    author_name: string;
}


const useFetchProducts = () => {
    const [data, setData] = useState<Product_Type[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() =>{
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await axios.get('http://127.0.0.1:8000/api/products/')
                setData(response.data)
            } catch (error: any) {
                setError(error.response?.data?.message || "Something went wrong!")
            } finally {
                setLoading(false)
            }
        }


        fetchData()
    }, [])

    return {
        data,
        loading,
        error
    }
}


export default  useFetchProducts