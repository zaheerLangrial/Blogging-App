"use client";
import useSignup from "@/customHooks/useSignupHook";
import { useState } from "react";

export default function Signup() {
    const { signup, loading, error } = useSignup();
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setProfilePicture(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form: any = e.target as HTMLFormElement;

        const formData = {
            username: form.username.value,
            password: form.password.value,
            name: form.name.value,
            gender: form.gender.value,
            birthday: form.birthday.value,
            profile_picture: profilePicture!,
        };

        await signup(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-center text-white">Sign Up</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="profile_picture"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            name="profile_picture"
                            id="profile_picture"
                            accept="image/*"
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Gender
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="birthday"
                            className="block text-sm font-medium text-gray-400"
                        >
                            Birthday
                        </label>
                        <input
                            type="date"
                            name="birthday"
                            id="birthday"
                            className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-700 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}
