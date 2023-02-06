import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/Todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  setTodoList: (payload: number | Todo) => void;
}

function SingleTodo({ index, todo, setTodoList }: Props) {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const handleDone = () => {
    setTodoList({ ...todo, isDone: !todo.isDone });
  };

  const handleDelete = (id: number) => {
    setTodoList(id);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodoList({ ...todo, todo: editTodo });
    setEditTodo("");
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              type="text"
              className="text"
              onChange={(e) => setEditTodo(e.target.value)}
              placeholder="edit todo"
              maxLength={25}
            />
          ) : todo.isDone ? (
            <s className="text">{todo.todo}</s>
          ) : (
            <span className="text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone()}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

export default SingleTodo;
