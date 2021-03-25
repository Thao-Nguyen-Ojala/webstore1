import { Switch, Route, useRouteMatch } from 'react-router-dom';
import React from 'react';
import ListPage from './pages/ListPage';
import { Box } from '@material-ui/core';

export default function ProductsPage() {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage}></Route>
      </Switch>
    </Box>
  );
}
