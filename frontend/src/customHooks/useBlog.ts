import { useEffect, useState } from "react";
import axios from "axios";
import { Product_Type } from "./useFetchBlogsHook";

export const useBlog = (id: string) => {
    const [blog, setBlog] = useState<Product_Type | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalLikes, setTotalLikes] = useState<number>(0);
    const [comments, setComments] = useState<{ id: number; text: string }[]>([]);
    const [newComment, setNewComment] = useState<string>("");

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
            const res = await axios.get(`http://127.0.0.1:8000/api/likes/${id}/`);
            setTotalLikes(res.data.users.length);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, []);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/comments/${id}/`);
            setComments(res.data);
        } catch (error) {
            console.log("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    const handleLikes = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Something went wrong. Please log in again.");
                return;
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/toggle_like/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response", response.data);
            fetchLikes();
        } catch (error) {
            console.log("error", error);
            console.log("Something went wrong. Please log in again.");
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Please log in to submit a comment.");
                return;
            }

            const response = await axios.post(
                `http://127.0.0.1:8000/api/comment/${id}/`,
                { text: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.log("Error posting comment:", error);
        }
    };

    return {
        blog,
        loading,
        error,
        totalLikes,
        comments,
        newComment,
        setNewComment,
        handleLikes,
        handleCommentSubmit,
    };
};
