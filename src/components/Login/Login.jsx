"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import axios from "axios";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "https://todolistbe.vercel.app/api/v1/user/check",
          { withCredentials: true }
        );
        const isAuthenticated = response.data.isAuthenticated;
        console.log(response.data);

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
      <LoginForm />
    </div>
  );
};

export default Login;
