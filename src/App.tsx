import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import NotFound from './components/NotFound/NotFound';
import AlbumPage from './features/Album/pages/AlbumPage';
import Counter from './features/Counter/Counter';
import ProductsPage from './features/Products/ProductsPage';
import TodoPage from './features/Todo/pages/TodoPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/' component={Counter} exact>
          <Redirect to='/products' />
        </Route>
        <Route path='/todos' component={TodoPage} />
        <Route path='/albums' component={AlbumPage} />
        <Route path='/products' component={ProductsPage} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
