'use client'
import useFetchProducts from "@/customHooks/useFetchBlogsHook";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Spin, Alert, Card } from "antd";
import Link from "next/link";

export default function Home() {
  const { data: blogs, loading, error } = useFetchProducts()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Blogs</h1>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Blog Image */}
              <div className="h-48 w-full relative">
                <Image
                  src={'http://127.0.0.1:8000' + blog.image}
                  alt={blog.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Blog Content */}
              <Link className="p-4" href={`/${blog.id}`}>
                <h2 className="text-lg text-gray-700 font-semibold truncate">{blog.name}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-1">
                  {blog.description}
                </p>
              </Link>

              {/* Footer Section */}
              <div className="flex justify-between items-center p-4 border-t">
                <span className="text-gray-500 text-sm font-medium">
                  By {blog.author_name}
                </span>
                <div className="flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
