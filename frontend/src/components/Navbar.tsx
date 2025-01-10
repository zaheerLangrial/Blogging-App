import Link from "next/link";
import { Button } from "antd";

export default function Navbar() {

    return (
        <nav className="bg-black text-white py-4 shadow-lg sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                {/* <Link href="/" className="text-2xl font-bold tracking-wide hover:text-gray-300">
          Blogzee
        </Link> */}

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
                    <Link href="/about">
                        <Button type="link" className="text-white hover:text-gray-300">
                            About
                        </Button>
                    </Link>
                    <Link href="/blogs">
                        <Button type="link" className="text-white hover:text-gray-300">
                            Blogs
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button type="link" className="text-white hover:text-gray-300">
                            Contact
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
