// pages/register.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./RegisterForm";
import axios from "axios";

const Register = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/check",
          { withCredentials: true }
        );
        const isAuthenticated = response.data.isAuthenticated;

        if (isAuthenticated) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, [router]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
