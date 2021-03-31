import React from 'react';
import {Link} from 'react-router-dom'
import Account from './Account';
import Cart from './Cart';

const Checkout = ({ order, user, token }) => {
    const { firstName, lastName, address, city, state, zip } = user; 
    console.log('this is the user in checkout', user)

    return (<div className='checkout'>
        
    <h3> welcome to checkout</h3>

    <Cart/>

    { token 
    ?   <Account firstName={firstName} lastName={lastName} address={address} city={city} state={state} zip={zip} /> 
    : <h3> You must be a registered user before you can checkout. Please register <Link to='/register'>here.</Link></h3>
       
    }
    <br/> 

    <button> Complete Order </button>


    </div>)
}

export default Checkout;