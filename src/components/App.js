import React, { useState, useEffect } from 'react';

import {
  Switch,
  Link,
  Route,
  BrowserRouter as Router,
  useHistory
} from 'react-router-dom';

import {
  ProductView,
  ProductsView,
  AccountForm
} from './';

import {
  getSomething
} from '../api';

const App = () => {
  const URL = `http://localhost:5000/api`
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({username: ''});
  const [token, setToken] = useState('');

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

  // keep here until we are ready for logout button
  // const handleLogout = (event) => {
  //   event.preventDefault();
  //   setUser({});
  //   setToken('');
  //   localStorage.clear();
  //   history.push('/')
  // }

  // return (<>
  //   <div className="App">
  //     <h1>Welcome to Baking With Friends!</h1>
  //     <h2>{ message }</h2>
  //   </div>

  //   <Route path ='/login'>
  //     <AccountForm URL={URL} type={'login'} setToken={setToken} setUser={setUser} />
  //   </Route>
  //   <Route path='/register'>
  //     <AccountForm  URL={URL} type={'register'} setToken={setToken} setUser={setUser} />
  //   </Route>
  // </>);
  return (<>
    <Router>
      <div className="App">
        <h1>Welcome to Baking With Friends!</h1>
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

          <Route path ='/login'>
            <AccountForm URL={URL} type={'login'} setToken={setToken} setUser={setUser} />
          </Route>

          <Route path='/register'>
            <AccountForm  URL={URL} type={'register'} setToken={setToken} setUser={setUser} />
          </Route>

        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
