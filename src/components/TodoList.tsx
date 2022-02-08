import React from 'react';
import './styles.css';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  const activeTodo = todos.filter(todo => !todo.isDone)
  const completedTodo = todos.filter(todo => todo.isDone)
  return <div className="container">
    <div className='todos'>
      <span className="todos__heading">Active Task</span>
      {activeTodo.map(todo => (
        <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
      ))}
    </div>
    <div className='todos'>
      <span className="todos__heading">Completed Task</span>
      {completedTodo.map(todo => (
        <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  </div>
};

export default TodoList;
