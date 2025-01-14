'use client'
import useAuth from "@/customHooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { isAuthenticated } = useAuth()
    const router = useRouter()


    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
        window.location.reload()
    }

    return (
        <nav className="bg-black text-white py-4 shadow-lg sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link
                    href="/"
                    className="relative inline-block text-2xl font-bold tracking-wide text-white hover:scale-110 hover:rotate-3 transition-transform"
                >
                    <span className="absolute inset-0 -z-10 text-transparent bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text">
                        Blogzee
                    </span>
                    Blogzee
                </Link>

                {/* Links */}
                <div className="flex items-center space-x-6">
                    <Link href="/about" className="text-white hover:text-sky-300">
                        About
                    </Link>
                    <Link href="/blogs" className="text-white hover:text-sky-300">
                        Blogs
                    </Link>
                    {
                        isAuthenticated ? <button onClick={handleLogout} className="text-white hover:text-sky-300">
                            Logout
                        </button> :
                            <Link href="/login" className="text-white hover:text-sky-300">
                                Login
                            </Link>
                    }

                </div>
            </div>
        </nav>
    );
}
