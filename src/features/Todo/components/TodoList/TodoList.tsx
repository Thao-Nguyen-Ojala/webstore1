import classnames from 'classnames';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

type TodoListProps = {
  todoList: TodoItem[];
  onTodoClick(todo: TodoItem, i: number): void;
};

export default function TodoList({ todoList, onTodoClick }: TodoListProps) {
  const handleTodoClick = (todo: TodoItem, i: number) => {
    if (!onTodoClick) return;

    onTodoClick(todo, i);
  };
  return (
    <ul className="todo-list">
      {todoList &&
        todoList.map((todo, i) => (
          <li
            key={todo.id}
            className={classnames({
              'todo-item': true,
              completed: todo.status === 'completed',
            })}
            onClick={() => handleTodoClick(todo, i)}
          >
            {todo.title}
          </li>
        ))}
    </ul>
  );
}
