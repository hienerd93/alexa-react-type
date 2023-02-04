import React, { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { Todo } from "./models/Todo";

const TodoContext = createContext<Todo[]>([]);
const TodoDispatchContext = createContext<React.Dispatch<Actions>>(() => {});

type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number }
  | { type: "copy"; payload: Todo[] };

const todoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "remove":
      return state.filter((t) => t.id !== action.payload);
    case "done":
      return state.map((t) =>
        t.id === action.payload ? { ...t, isDone: !t.isDone } : t
      );
    case "copy":
      return action.payload;
    default:
      return state;
  }
};

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, []);

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
