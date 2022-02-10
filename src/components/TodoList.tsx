import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './styles.css';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface Props {
  activeTodos: Todo[],
  completedTodos: Todo[],
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ activeTodos,
  completedTodos, todos, setTodos }: Props) => {
  return <div className="container">
    <Droppable droppableId='activeList'>
      {(provided, snapshot) => (
        <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
          <span className="todos__heading">Active Task</span>
          {activeTodos.map((todo, index) => (
            <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    <Droppable droppableId='completedList'>
      {(provided, snapshot) => (
        <div className={`todos completed ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
          <span className="todos__heading">Completed Task</span>
          {completedTodos.map((todo, index) => (
            <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
          ))}
          {provided.placeholder}
        </div>

      )}
    </Droppable>
  </div>
};

export default TodoList;
