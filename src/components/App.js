import React, { useState, useEffect } from 'react';

import {
  Switch,
  Link,
  Route,
  useHistory
} from 'react-router-dom';

import {
  getAllProducts
} from '../api';

import {
  ProductView,
  ProductsView,
  AccountForm,
  Account,
  Order,
  Cart,
  Home,
  Checkout,
  Reviews,
  Users,
  SingleUser,
  AddUser,
  AllOrders,
  ProductForm,
  EditReview,
  DeleteReview,
  AddReview
} from './';

const App = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [order, setOrder] = useState({});
  const [reviews, setReviews] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [singleUser, setSingleUser] = useState({id: null, username: '', isAdmin: false, firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: null});
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(0);
  const [userId, setUserId] = useState(0);
  const [productId, setProductId] = useState(0);

  const history = useHistory();

  useEffect( () => {

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
    history.push('/');
  }

  const getUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsersList(data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const getProducts = async () => {
    try {
      const _products = await getAllProducts();
      setProducts(_products);
    } catch (err) {
      console.error(err);
    }
  }

  const states = [
    { 'label':'Alabama', 'value': 'AL' },
    { 'label':'Alaska', 'value': 'AK'},
    { 'label':'American Samoa', 'value': 'AS'},
    { 'label':'Arizona', 'value': 'AZ'},
    { 'label':'Arkansas', 'value': 'AR'},
    { 'label':'California', 'value': 'CA'},
    { 'label':'Colorado', 'value': 'CO'},
    { 'label':'Connecticut', 'value': 'CT'},
    { 'label':'Delaware', 'value': 'DE'},
    { 'label':'District of Columbia', 'value': 'DC'},
    { 'label':'States of Micronesia', 'value': 'FM'},
    { 'label':'Florida', 'value': 'FL'},
    { 'label':'Georgia', 'value': 'GA'},
    { 'label':'Guam', 'value': 'GU'},
    { 'label':'Hawaii', 'value': 'HI'},
    { 'label':'Idaho', 'value': 'ID'},
    { 'label':'Illinois', 'value': 'IL'},
    { 'label':'Indiana', 'value': 'IN'},
    { 'label':'Iowa', 'value': 'IA'},
    { 'label':'Kansas', 'value': 'KS'},
    { 'label':'Kentucky', 'value': 'KY'},
    { 'label':'Louisiana', 'value': 'LA'},
    { 'label':'Maine', 'value': 'ME'},
    { 'label':'Marshall Islands', 'value': 'MH'},
    { 'label':'Maryland', 'value': 'MD'},
    { 'label':'Massachusetts', 'value': 'MA'},
    { 'label':'Michigan', 'value': 'MI'},
    { 'label':'Minnesota', 'value': 'MN'},
    { 'label':'Mississippi', 'value': 'MS'},
    { 'label':'Missouri', 'value': 'MO'},
    { 'label':'Montana', 'value': 'MT'},
    { 'label':'Nebraska', 'value': 'NE'},
    { 'label':'Nevada', 'value': 'NV'},
    { 'label':'New Hampshire', 'value': 'NH'},
    { 'label':'New Jersey', 'value': 'NJ'},
    { 'label':'New Mexico', 'value': 'NM'},
    { 'label':'New York', 'value': 'NY'},
    { 'label':'North Carolina', 'value': 'NC'},
    { 'label':'North Dakota', 'value': 'ND'},
    { 'label':'Northern Mariana Islands', 'value': 'MP'},
    { 'label':'Ohio', 'value': 'OH'},
    { 'label':'Oklahoma', 'value': 'OK'},
    { 'label':'Oregan', 'value': 'OR'},
    { 'label':'Palau', 'value': 'PW'},
    { 'label':'Pennsylvania', 'value': 'PA'},
    { 'label':'Puerto Rico', 'value': 'PR'},
    { 'label':'Rhode Island', 'value': 'RI'},
    { 'label':'South Carolina', 'value': 'SC'},
    { 'label':'South Dakota', 'value': 'SD'},
    { 'label':'Tennessee', 'value': 'TN'},
    { 'label':'Texas', 'value': 'TX'},
    { 'label':'Utah', 'value': 'UT'},
    { 'label':'Vermont', 'value': 'VT'},
    { 'label':'Virgin Islands', 'value': 'VI'},
    { 'label':'Virginia', 'value': 'VA'},
    { 'label':'Washington', 'value': 'WA'},
    { 'label':'West Virginia', 'value': 'WV'},
    { 'label':'Wisconsin', 'value': 'WI'},
    { 'label':'Wyoming', 'value': 'WY'}
    ];

  const getReviews = async () => {
    const response = await fetch(`/api/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'Application/json'
        }
    });
    const data = await response.json();
    setReviews(data);
}

useEffect( () => {
    getReviews();
}, [])

  return (<>
  <div id="logo-head">
  <h1 className="logo">FOOD WITH FRIENDS</h1>
  <div className="nav-bar">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Shop</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/account" id={token ? '' : 'loggedOut-account'}>Account</Link>
      <Link to='/users' id={user.isAdmin ? '' : 'users-is-not-admin'}>Users</Link>
      <Link to='/orders' id={user.isAdmin ? '' : 'orders-is-not-admin'}>Orders</Link>
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

          <Route exact path ='/products/add'>
            <ProductForm user={user} token={token} getProducts={getProducts} product={product} setProduct={setProduct} />
          </Route>

          <Route path="/products/:productId">
            <ProductView cart={order} token={token} product={product} setProduct={setProduct} reviews={reviews} setReviews={setReviews} />
          </Route>

          <Route exact path="/products">
            <ProductsView cart={order} token={token} user={user} products={products} getProducts={getProducts} reviews={reviews} setReviews={setReviews} />
          </Route>

          <Route exact path="/reviews">
            <Reviews reviews={reviews} setReviews={setReviews}/>
          </Route>

          <Route path ='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} states={states} />
          </Route>

          <Route path='/register'>
            <AccountForm  type={'register'} setToken={setToken} setUser={setUser} states={states} />
          </Route>

          <Route path='/account'>
            <Account user={user} token={token} reviews={reviews} setReviews={setReviews} title={title} setTitle={setTitle} content={content} setContent={setContent} stars={stars} setStars={setStars} userId={userId} setUserId={setUserId} productId={productId} setProductId={setProductId} />
          </Route>

          <Route path='/orders/:orderId'>
            <Order token={token} order={order} setOrder={setOrder} />
          </Route>

          <Route exact path='/cart'>
            <Cart token={token} order={order} user={user} order={order} setOrder={setOrder} />
          </Route>

          <Route exact path='/cart/checkout'>
            <Checkout order={order} user={user} token={token} />
          </Route>

          <Route exact path='/users' >
            <Users user={user} setSingleUser={setSingleUser} getUsers={getUsers} usersList={usersList} />
          </Route>

          <Route exact path='/users/add'>
            <AddUser user={user} singleUser={singleUser} setSingleUser={setSingleUser} getUsers={getUsers} states={states} />
          </Route>

          <Route exact path='/users/:userId'>
            <SingleUser token={token} user={user} singleUser={singleUser} setSingleUser={setSingleUser} getUsers={getUsers} states={states} />
          </Route>

          <Route exact path='/orders'>
            <AllOrders token={token} user={user} />
          </Route>

          <Route exact path='/editreview'>
            <EditReview token={token} user={user} reviews={reviews} setReviews={setReviews} />
          </Route>

          <Route exact path='/editreview'>
            <DeleteReview token={token} user={user} reviews={reviews} setReviews={setReviews} />
          </Route>

          <Route exact path="/checkout/success">
            <div className="success">
            <h1>THANK YOU FOR YOUR ORDER</h1>
            <p>
              We appreciate every customer that believes in our dream. <br/>
              If you have any questions, please e-mail <br/>
              <a href="mailto:orders@example.com">orders@example.com</a>
            </p>
            </div>
          </Route>

          <Route exact path="/checkout/cancel">
            <div className="cancelled"> 
            <h1>CANCELLED THE ORDER</h1>
            <p>
              We hope you come back soon! <br/>
              If you have any questions, please e-mail <br/>
              <a href="mailto:orders@example.com">orders@example.com</a>
            </p>
            </div>
          </Route>

        </Switch>

      </div>
    </>
  );
}

export default App;
