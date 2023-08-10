"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/check",
          { withCredentials: true }
        );
        setIsAuthenticated(response.data.isAuthenticated);

        if (response.data.isAuthenticated) {
          // Fetch the user's information and update the username state
          const userResponse = await axios.get(
            "http://localhost:8000/api/v1/user/profile",
            { withCredentials: true }
          );
          setUsername(userResponse.data.username);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, []);
  return (
    <div id="title">
      <div className="container mx-auto p-4 flex justify-between items-center text-amber-100">
        <div className=" font-bold brand">TodoList</div>
        <div className="text-base ml-auto">
          {isAuthenticated ? (
            <>
              {/* Show username and Logout when logged in */}
              <span className="mr-4">{username}</span>
              <button className="hover:text-yellow-200" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Login and Register when not logged in */}
              <Link href="/login">
                <span className="hover:text-yellow-200 mr-4">Login</span>
              </Link>
              <Link href="/register">
                <span className="hover:text-yellow-200">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="text-center pt-16 text-amber-100">
        <div className="text-center font-black text-6xl text-amber-100">
          Manage your tasks with our ToDoList app
        </div>
        <div className="text-lg leading-9 pt-10 pb-10 px-4">
          Organize, prioritize, and complete tasks with ease, whether you are at
          home or on the go. Stay on top of your commitments and goals with our
          sleek and user-friendly interface. Try it now to experience a new
          level of task management efficiency
        </div>
        <Link href="/todo">
          <button className=" bg-transparent hover:bg-amber-100 text-amber-100 font-semibold hover:text-blue-400 py-4 px-8 border border-amber-100 hover:border-transparent rounded-full">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};
