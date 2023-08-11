"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

const Register = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token"); // Check if token exists

        if (token) {
          setLoggedIn(true);
          router.push("/"); // Redirect to home if token exists
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
