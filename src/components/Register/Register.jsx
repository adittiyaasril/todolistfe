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
        const token = localStorage.getItem("jwtToken"); // Get the JWT token from storage

        if (token) {
          // If token exists, set the authorization header for API requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setIsAuthenticated(true);
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
