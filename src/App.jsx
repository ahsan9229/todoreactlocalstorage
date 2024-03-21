import "./App.css";
import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./Components/TodoForm";
import TodoItems from "./Components/TodoItems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // setTodos(...todos, { id: Date.now(), ...todo });
    const filterdItems = todos.filter((val) => val.todo === todo.todo);

    if (filterdItems.length < 1) {
      setTodos((prev) => [{ id: Date.now(), ...todo }, ...todos]);
      toast.success("Data Saved Successfully..");
    } else {
      toast.error("Data Already Exist..");
    }
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.success("Data Deleted Successfully..");
  };

  const todoToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Local Storage Functionalities

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, todoToggleComplete }}
    >
      <ToastContainer />
      <div className="bg-[#172842] py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
