import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { PostList } from '../../../components';
import { TodoForm, TodoList } from '../components';
import TodoItem from '../components/TodoItem/TodoItem';

type formValueObj = {
  title: string;
};

export default function TodoPage() {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoList);

  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo: TodoItem, i: number) => {
    console.log(todo, i);
    const newTodoList = [...todoList];
    newTodoList[i] = {
      ...newTodoList[i],
      status: newTodoList[i].status === 'new' ? 'completed' : 'new',
    };
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    //setFilterStatus('all');
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowCompletedClick = () => {
    //setFilterStatus('completed');
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNewClick = () => {
    //setFilterStatus('new');
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleTodoOnSubmit = (values: formValueObj) => {
    console.log('form value', values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };
    const newTodoList = [...todoList, newTodo];
    //newTodoList.push(newTodo);
    setTodoList(newTodoList);
  };

  const renderTodoList = useMemo(() => {
    return todoList.filter((todo) => filterStatus === 'all' || filterStatus === todo.status);
  }, [todoList, filterStatus]);

  //PostList

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      const url = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';

      const res = await fetch(url);
      const resJSON = await res.json();

      const { data } = resJSON;

      setPostList(data);
    };
    fetchPostList();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoOnSubmit} />

      <div>
        <button onClick={handleShowAllClick}>All</button>
        <button onClick={handleShowCompletedClick}>Completed</button>
        <button onClick={handleShowNewClick}>New</button>
      </div>

      <h1>Post List</h1>
      <PostList posts={postList} />
    </div>
  );
}
