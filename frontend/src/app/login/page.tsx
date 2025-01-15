"use client";
import useAuth from "@/customHooks/useAuth";
import useLogin from "@/customHooks/useLogin";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login, loading, error } = useLogin();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;
        login(username, password);
    };

    if (isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[85vh] bg-black">
                <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md text-center">
                    <h1 className="text-2xl font-bold text-white">You are already logged in</h1>
                    <button
                        onClick={() => router.push("/")} // Redirect to the homepage
                        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-black">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-center text-white">Login</h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    {error && (
                        <p className="mb-4 text-sm text-red-400 bg-gray-700 p-2 rounded">
                            {error}
                        </p>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-700 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Signup navigation */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <button
                            onClick={() => router.push("/signup")} // Navigate to the signup page
                            className="text-blue-500 hover:underline"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
