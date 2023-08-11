"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TodoList } from "./TodoList";

const Todo = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return <div>{!isAuthenticated && <TodoList />}</div>;
};

export default Todo;
