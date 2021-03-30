import React from 'react';
import {Link} from 'react-router-dom'
import Account from './Account';
import Cart from './Cart';

const Checkout = ({ order, user, token }) => {

    return (<div className='checkout'>
        
    <h3> welcome to checkout</h3>

    { token 
    ?   <Account> </Account> 
    : <h3> You must be a registered user before you can checkout. Please register <Link to='/register'>here.</Link></h3>
       
    }
    <br/> 
    <h3> shipping address</h3>


    </div>)
}

export default Checkout;