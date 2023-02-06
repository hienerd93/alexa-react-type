import React, { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { Todo } from "./models/Todo";

interface TodoInterface {
  active: Todo[];
  doing: Todo[];
  completed: Todo[];
}
export type keyTodo = keyof TodoInterface;
type Actions =
  | { type: "active/add"; payload: string }
  | { type: "active/remove"; payload: number }
  | { type: "active/edit"; payload: Todo }
  | { type: "active/copy"; payload: Todo[] }
  | { type: "doing/add"; payload: string }
  | { type: "doing/remove"; payload: number }
  | { type: "doing/edit"; payload: Todo }
  | { type: "doing/copy"; payload: Todo[] }
  | { type: "completed/add"; payload: string }
  | { type: "completed/remove"; payload: number }
  | { type: "completed/edit"; payload: Todo }
  | { type: "completed/copy"; payload: Todo[] };

const initTodo = {
  active: [],
  doing: [],
  completed: [],
};

const TodoContext = createContext<TodoInterface>(initTodo);
const TodoDispatchContext = createContext<React.Dispatch<Actions>>(() => null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initTodo);

  return (
    <TodoContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export function useTodo() {
  return useContext(TodoContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

const todoReducer = (state: TodoInterface, action: Actions) => {
  const term = action.type.split("/")[0] as keyTodo;

  switch (true) {
    case action.type.includes("add"):
      return {
        ...state,
        [term]: [
          ...state[term],
          { id: Date.now(), todo: action.payload, isDone: false },
        ],
      };
    case action.type.includes("remove"):
      return {
        ...state,
        [term]: state[term].filter((t) => t.id !== action.payload),
      };
    case action.type.includes("edit"):
      return {
        ...state,
        [term]: state[term].map((t) =>
          t.id === (action.payload as Todo).id ? action.payload : t
        ),
      };
    case action.type.includes("copy"):
      return { ...state, [term]: action.payload };
    default:
      return state;
  }
};
