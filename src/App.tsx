import { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound/NotFound';
import AlbumPage from './features/Album/pages/AlbumPage';
import TodoPage from './features/Todo/pages/TodoPage';
import categoryApi from './api/categoryApi';
import Counter from './features/Counter/Counter';
import { Header } from './components';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const category = await categoryApi.getAll();
      console.log(category);
    };

    fetchProducts();
  }, []);

  return (
    <div className='App'>
      <Header />
      <p>
        <Link to='/todo'>Todo</Link>
      </p>
      <p>
        <Link to='/album'>Album</Link>
      </p>
      <Switch>
        {/*<Route path='/' component={TodoPage} exact />*/}
        <Route path='/' component={Counter} exact />
        <Route path='/todos' component={TodoPage} />
        <Route path='/albums' component={AlbumPage} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
