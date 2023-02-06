import React, { useState } from "react";
import TodoDashboard from "./TodoDashboard";
import { TodoProvider } from "./TodoProvider";

const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  switch (path) {
    case "/":
    case "/dashboard":
      return (
        <TodoProvider>
          <TodoDashboard />
        </TodoProvider>
      );
    default:
      return (
        <>
          <h2 className="danger">Page Not Found</h2>
          <button
            type="button"
            onClick={() => {
              history.pushState({}, "", "/dashboard");
              setPath("/dashboard");
            }}
          >
            Go to Dashboard
          </button>
        </>
      );
  }
};

export default App;
