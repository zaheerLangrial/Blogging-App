import { useEffect, useState } from "react";
import { Product_Type } from "./useFetchBlogsHook";
import axios from "axios";


export const useBlog = (id: string) => {
    const [blog, setBlog] = useState<Product_Type | null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const [totalLikes, setTotalLikes] = useState<number>(0)

      useEffect(() => {
        const fetchBlog = async () => {
          setLoading(true);
          try {
            const response = await axios.get<Product_Type>(`http://127.0.0.1:8000/api/products/${id}/`);
            setBlog(response.data);
          } catch (err) {
            setError("Failed to fetch blog details.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchBlog();
      }, [id]);


      const fetchLikes = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/likes/${id}/`)
            setTotalLikes(res.data.users.length)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchLikes()
    }, [])


    const handleLikes = async () => {
      try {
        // Fetch the token from local storage
        const token = localStorage.getItem('token');
        
        // If token is not found, log an error and return
        if (!token) {
          console.log('Token not found in local storage');
          return;
        }
    
        // Make the request with the token included in the headers
        const response = await axios.get(`http://127.0.0.1:8000/api/toggle_like/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in Authorization header
          }
        });
    
        console.log('response', response.data);
        fetchLikes()
      } catch (error) {
        console.log('error', error);
      }
    };
    
      return {
        blog,
        loading,
        error,
        totalLikes, 
        handleLikes
      }
}