import React, { useState, useEffect } from 'react';

import {
  Switch,
  Link,
  Route,
  useHistory
} from 'react-router-dom';

import {
  ProductView,
  ProductsView,
  AccountForm,
  Account,
  Order,
  Cart,
  Home,
  Checkout
} from './';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [order, setOrder] = useState({});

  const history = useHistory();

  useEffect( () => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });

  setToken(localStorage.getItem('token'));

    if (token) {
      const captureToken = async () => {
        const response = await fetch(`/api/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const meData = await response.json();
        setUser(meData);
      }
      captureToken();
    }
  }, [token]);

  const handleLogout = (event) => {
    event.preventDefault();
    setUser({});
    setToken('');
    localStorage.clear();
    history.push('/')
  }

  return (<>
  <div id="logo-head">
  <h1 className="logo">FOOD WITH FRIENDS</h1>
  <div className="nav-bar">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Shop</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/account" id={token ? '' : 'loggedOut-account'}>Account</Link>
      <Link to="/" id={token ? '' : 'loggedOut-logout'} onClick={handleLogout}>Logout</Link>
      <Link to="/login" id={!token ? '' : 'loggedOut-login'}>Login</Link>
    </nav>
  </div>
  </div>
      <div className="App">
        <h2>{ message }</h2>



        <Switch>

          <Route exact path='/'>
            <Home user={user} />
          </Route>

          <Route path="/products/:productId">
            <ProductView />
          </Route>

          <Route exact path="/products">
            <ProductsView />
          </Route>

          <Route path ='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} />
          </Route>

          <Route path='/register'>
            <AccountForm  type={'register'} setToken={setToken} setUser={setUser} />
          </Route>

          <Route path='/account'>
            <Account user={user} token={token} />
          </Route>

          <Route path='/orders/:orderId'>
            <Order token={token} order={order} setOrder={setOrder} />
          </Route>

          <Route exact path='/cart'>
            <Cart />
          </Route>

          <Route exact path='/cart/checkout'>
            <Checkout order={order} user={user} token={token} />
          </Route>

          <Route path="/checkout/success">
            <h1>THANK YOU FOR YOUR ORDER</h1>
            <p>
              We appreciate every customer that believes in our dream. <br/>
              If you have any questions, please e-mail <br/>
              <a href="mailto:orders@example.com">orders@example.com</a>
            </p>
          </Route>
          <Route path="/checkout/cancel">
            <h1>CANCELLED THE ORDER</h1>
            <p>
              We hope you come back soon! <br/>
              If you have any questions, please e-mail <br/>
              <a href="mailto:orders@example.com">orders@example.com</a>
            </p>
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default App;
