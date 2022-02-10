import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiEdit3 } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

import { Todo } from '../model';

interface Props {
  index: number
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleDone = (id: number) => {
    if (!editMode) {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, todo: editTodoText } : todo)
    )
    setEditMode(false);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode])

  return <Draggable draggableId={todo.id.toString()} index={index}>
    {(provided, snapshot) => (
      <form className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        {editMode ? (
          <input ref={inputRef} type='text' value={editTodoText} onChange={e => setEditTodoText(e.target.value)} onBlur={(e) => handleEdit(e, todo.id)} className='todos__single--text input' />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )}
        <div>
          <span className="icon" onClick={() => {
            if (!editMode && !todo.isDone) setEditMode(!editMode)
          }}><FiEdit3 /></span>
          <span className="icon delete" onClick={() => handleDelete(todo.id)}><MdDelete /></span>
          <span className="icon" onClick={() => handleDone(todo.id)}><TiTick /></span>
        </div>
      </form>
    )}
  </Draggable>
};

export default SingleTodo;
