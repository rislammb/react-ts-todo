import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';

const App: React.FC = () => {
  const result: string | null = localStorage.getItem("TS_TODO_LIST");
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(result ? JSON.parse(result) : []);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, {
        id: Date.now(),
        todo,
        isDone: false
      }])
      setTodo('');
    }
  }

  useEffect(() => {
    setActiveTodos(todos.filter(todo => !todo.isDone))
    setCompletedTodos(todos.filter(todo => todo.isDone))
    localStorage.setItem("TS_TODO_LIST", JSON.stringify(todos));
  }, [todos]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active = activeTodos, completed = completedTodos;
    if (source.droppableId === 'activeList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'activeList') {
      add.isDone = false;
      active.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      completed.splice(destination.index, 0, add);
    }
    setActiveTodos(active);
    setCompletedTodos(completed)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Typescript Todo</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList activeTodos={activeTodos} completedTodos={completedTodos} todos={todos} setTodos={setTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
