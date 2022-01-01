import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';

import Counter from './features/Counter/Counter';
import { Header } from './components';
import NotFound from './components/NotFound/NotFound';
import ProductsPage from './features/Products/ProductsPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/' component={Counter} exact>
          <Redirect to='/products' />
        </Route>
        {/*<Route path='/albums' component={AlbumPage} />*/}
        <Route path='/products' component={ProductsPage} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
