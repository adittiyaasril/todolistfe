"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token"); // Check if token exists

        if (token) {
          router.push("/"); // Redirect to home if token exists
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, [router]);

  return <div>{!localStorage.getItem("token") && <LoginForm />}</div>;
};

export default Login;
