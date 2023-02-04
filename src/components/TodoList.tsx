import React from "react";
import { Todo } from "../models/Todo";
import SingleTodo from "./SingleTodo";
import { StrictDroppable } from "./StrictDroppable";
import "./styles.css";

interface Props {
  todoList: Todo[];
  completedList: Todo[];
  doingList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDoingList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoList({
  todoList,
  completedList,
  doingList,
  setTodoList,
  setCompletedList,
  setDoingList,
}: Props) {
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
                  setTodoList={setTodoList}
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
                  setTodoList={setDoingList}
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
                  setTodoList={setCompletedList}
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
