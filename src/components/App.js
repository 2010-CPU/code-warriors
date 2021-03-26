import React, { useState, useEffect } from 'react';
import {Route, Link, useHistory} from 'react-router-dom';

import {
  getSomething
} from '../api';

import {
  AccountForm
} from '/';

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

  return (<>
    <div className="App">
      <h1>Welcome to Baking With Friends!</h1>
      <h2>{ message }</h2>
    </div>

    <Route path ='/login'>
      <AccountForm URL={URL} type={'login'} setToken={setToken} setUser={setUser} />
    </Route>
    <Route path='/register'>
      <AccountForm  URL={URL} type={'register'} setToken={setToken} setUser={setUser} />
    </Route>
  </>);
}

export default App;