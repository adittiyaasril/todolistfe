"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodoItems = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      const response = await axios.get(
        "https://todolistbe.vercel.app/api/v1/todo/show",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodoItems(response.data.todo);
    } catch (error) {
      console.error("Error fetching ToDo items:", error);
    }
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const handleDeleteTodo = async (itemId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage or your state management
      await axios.delete(
        `https://todolistbe.vercel.app/api/v1/todo/delete/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      fetchTodoItems();
    } catch (error) {
      console.error("Error deleting ToDo item:", error);
    }
  };

  const handleCreateTodo = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage or your state management
      const response = await axios.post(
        "https://todolistbe.vercel.app/api/v1/todo/create",
        {
          item: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.data.msg === "Todo successfully created") {
        setNewTodo("");
        fetchTodoItems();
      }
    } catch (error) {
      console.error("Error creating ToDo item:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-20 w-full flex-1 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex max-w-4xl">
          <div className=" p-5">
            <div className="text-right font-bold">
              <a href="/">
                <span className="text-green-500">Back</span>
              </a>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-green-500 mb-2">
                Today List
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>

              <div className="flex flex-col items-center">
                <ul>
                  {todoItems.map((item) => (
                    <li
                      key={item.id}
                      className="bg-gray-100 w-64 p-2 flex items-center mb-3"
                    >
                      <input type="checkbox" name="checkbox" value="" />
                      <p className="pl-1">{item.item}</p>
                      <button
                        onClick={() => handleDeleteTodo(item.id)}
                        className="border-2 border-red-500 text-red-500 rounded-lg px-2 inline-block font-semibold hover:bg-red-500 bg-white hover:text-white ml-auto"
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-100 w-64 p-2 flex items-center mt-3 mb-3">
                  <input
                    type="text"
                    name="todo"
                    placeholder="Add Item"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                  <button
                    onClick={handleCreateTodo}
                    className="border-2 border-green-500 text-white rounded-r-lg px-4 py-2 inline-block font-semibold hover:bg-white bg-green-500 hover:text-green-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
