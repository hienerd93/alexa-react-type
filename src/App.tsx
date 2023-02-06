import React, { useState } from "react";
import InputField from "./components/InputField";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import { useTodo, useTodoDispatch, keyTodo } from "./TodoProvider";

function App() {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useTodoDispatch();
  const {
    active: todoList,
    completed: completedList,
    doing: doingList,
  } = useTodo();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      dispatch({ type: "active/add", payload: todo });
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todoList,
      doing = doingList,
      completed = completedList;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "CompletedTodo") {
      add = completed[source.index];
      completed.splice(source.index, 1);
    } else {
      add = doing[source.index];
      doing.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "CompletedTodo") {
      completed.splice(destination.index, 0, add);
    } else {
      doing.splice(destination.index, 0, add);
    }

    dispatch({ type: "active/copy", payload: active });
    dispatch({ type: "completed/copy", payload: completed });
    dispatch({ type: "doing/copy", payload: doing });
  };

  const setTodoList = (key: keyTodo, payload: number | Todo) => {
    if (typeof payload === "number") {
      dispatch({ type: `${key}/remove`, payload });
    } else {
      dispatch({ type: `${key}/edit`, payload });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h2>Devourer</h2>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todoList={todoList}
          completedList={completedList}
          doingList={doingList}
          setTodoList={setTodoList}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
