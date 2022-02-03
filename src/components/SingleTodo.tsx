import React, { useEffect, useRef, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

import { Todo } from '../model';

interface Props {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }: Props) => {
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

  return <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
    {editMode ? (
      <input ref={inputRef} type='text' value={editTodoText} onChange={e => setEditTodoText(e.target.value)} className='todos__single--text input' />
    ) : todo.isDone ? (
      <s className="todos__single--text">{todo.todo}</s>
    ) : (
      <span className="todos__single--text">{todo.todo}</span>
    )}
    <div>
      <span className="icon" onClick={() => {
        if (!editMode && !todo.isDone) setEditMode(!editMode)
      }}><FiEdit3 /></span>
      <span className="icon" onClick={() => handleDelete(todo.id)}><MdDelete /></span>
      <span className="icon" onClick={() => handleDone(todo.id)}><TiTick /></span>
    </div>
  </form>;
};

export default SingleTodo;
