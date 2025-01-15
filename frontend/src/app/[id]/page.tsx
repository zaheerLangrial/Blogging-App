'use client'

import { useBlog } from '@/customHooks/useBlog';
import { FaThumbsUp } from 'react-icons/fa';

const BlogDetails = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { loading, error, blog, totalLikes, comments, newComment, setNewComment, handleLikes, handleCommentSubmit } = useBlog(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{blog?.name}</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <img
                    src={`http://127.0.0.1:8000${blog?.image}`}
                    alt={blog?.name}
                    className="rounded-lg"
                    width="100%"
                    height="auto"
                />
                <p className="mt-4 text-gray-700">{blog?.description}</p>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500">By {blog?.author_name}</p>

                    {/* Like Icon */}
                    <button
                        onClick={handleLikes}
                        className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
                    >
                        <FaThumbsUp />
                        {totalLikes > 0 && <span>({totalLikes})</span>}
                    </button>
                </div>
            </div>

            {/* Comment Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                <div className="mb-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-2 border border-gray-300 text-gray-600 rounded-md"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Post Comment
                    </button>
                </div>

                {/* Display Comments */}
                <div>
                    {comments.length === 0 ? (
                        <p>No comments yet.</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="border-b border-gray-300 pb-4 mb-4">
                                <p>{comment.text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
