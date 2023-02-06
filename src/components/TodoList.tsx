import React from "react";
import { Todo } from "../models/Todo";
import { keyTodo } from "../TodoProvider";
import SingleTodo from "./SingleTodo";
import { StrictDroppable } from "./StrictDroppable";
import "./styles.css";

interface Props {
  todoList: Todo[];
  completedList: Todo[];
  doingList: Todo[];
  setTodoList: (key: keyTodo, payload: number | Todo) => void;
}

function TodoList({ todoList, completedList, doingList, setTodoList }: Props) {
  return (
    <div className="container u-max-full-width todo-content">
      <div className="columns four">
        <StrictDroppable droppableId="TodoList">
          {(provided, snapshot) => (
            <div
              className={`primary todo-list ${
                snapshot.isDraggingOver ? "dragging" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Todo</h3>
              {todoList.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodoList={(payload) => setTodoList("active", payload)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictDroppable>
      </div>
      <div className="columns four">
        <StrictDroppable droppableId="DoingTodo">
          {(provided, snapshot) => (
            <div
              className={`accent todo-list ${
                snapshot.isDraggingOver ? "dragging" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Doing</h3>
              {doingList.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodoList={(payload) => setTodoList("doing", payload)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictDroppable>
      </div>
      <div className="columns four">
        <StrictDroppable droppableId="CompletedTodo">
          {(provided, snapshot) => (
            <div
              className={`second todo-list ${
                snapshot.isDraggingOver ? "active" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Completed</h3>
              {completedList.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodoList={(payload) => setTodoList("completed", payload)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictDroppable>
      </div>
    </div>
  );
}

export default TodoList;
