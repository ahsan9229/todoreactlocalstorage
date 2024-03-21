import { useContext, createContext } from "react";

export const todoContext = createContext({
  todos: [{ id: 1, todo: "Todo Msg", completed: false }],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  todoToggleComplete: (id) => {},
});

export const useTodo = () => {
  return useContext(todoContext);
};
export const TodoProvider = todoContext.Provider;
