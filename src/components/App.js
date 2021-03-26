import React, { useState, useEffect } from 'react';
import {
  Switch,
  Link,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';

import {
  ProductView,
  ProductsView
} from './';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <Router>
      <div className="App">
        <h1>Hello, World!</h1>
        <h2>{ message }</h2>
        _______________
        <h4><Link to="/products">Products</Link></h4>
        _______________

        <Switch>
          <Route path="/products/:productId">
            <ProductView />
          </Route>

          <Route exact path="/products">
            <ProductsView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
