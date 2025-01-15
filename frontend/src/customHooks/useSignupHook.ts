// hooks/useSignup.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignupData {
    username: string;
    password: string;
    name: string;
    gender: string;
    birthday: string;
    profile_picture: File;
}

const useSignup = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: SignupData) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("name", data.name);
        formData.append("gender", data.gender);
        formData.append("birthday", data.birthday);
        formData.append("profile_picture", data.profile_picture);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/sign_up/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                router.push("/login");
            } else {
                const responseData = await response.json();
                setError(responseData.error || "An error occurred during signup.");
            }
        } catch (err) {
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
};

export default useSignup;
