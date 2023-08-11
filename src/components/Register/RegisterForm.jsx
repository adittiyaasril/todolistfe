"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://todolistbe.vercel.app/api/v1/user/register",
        { username, email, password },
        { withCredentials: true }
      );

      console.log("Register response:", response.data);

      if (response.status === 201) {
        const token = response.data.token; // Assuming the token is returned in the response

        // Store the token in localStorage or a state management solution
        localStorage.setItem("token", token);

        // Redirect user to dashboard or protected page
        router.push("/todo");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-20 w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex max-w-4xl">
          <div className=" p-5">
            <div className="text-left font-bold">
              <a href="/">
                <span className="text-green-500">Todo</span>List
              </a>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-green-500 mb-2">
                Register Account
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>

              <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit}>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-100 outline-none text-sm flex-1"
                    />
                  </div>

                  <div className="flex justify-between w-64 mb-5">
                    <label htmlFor="" className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />{" "}
                      Remember me
                    </label>
                    <a className="text-xs">Forgot Password?</a>
                  </div>

                  <button
                    type="submit"
                    className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white"
                  >
                    Register
                  </button>
                </form>
                <p className=" pt-3">
                  Already have an account?
                  <Link
                    href="/login"
                    className="font-semibold leading-6 text-green-500 hover:text-green-400"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
