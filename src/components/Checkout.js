import React from 'react';
import {Link} from 'react-router-dom'
import Account from './Account';
import Cart from './Cart';

const Checkout = ({ order, user, token }) => {
    // const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;
    // const { id, status, userId, datePlaced } = order;

    return (<div className='checkout'>
        
    <h3> welcome to checkout</h3>

    {/* <Cart> </Cart> */}

    { token 
    ?   <Account> </Account> 
    : <h3> You must be a registered user before you can checkout. Please register <Link to='/register'>here.</Link></h3>
       
    }
    <br/> 
    <h3> shipping address</h3>


    </div>)
}

export default Checkout;