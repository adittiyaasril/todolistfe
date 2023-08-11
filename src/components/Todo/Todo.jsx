"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoList } from "./TodoList";

const Todo = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token"); // Check if token exists

        if (token) {
          setLoggedIn(true);
        } else {
          router.push("/"); // Redirect to login if no token exists
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, [router]);

  return <div>{isLoggedIn && <TodoList />}</div>;
};

export default Todo;
