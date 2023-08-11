"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

const Register = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          setLoggedIn(true);
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, [router]);

  return <div>{!isLoggedIn && <RegisterForm />}</div>;
};

export default Register;
