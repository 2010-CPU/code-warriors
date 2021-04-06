import React from 'react';
import {Link} from 'react-router-dom'
import Account from './Account';
import Cart from './Cart';
import { loadStripe } from '@stripe/stripe-js';

// Load stripe once instead of on every render
const stripePromise = loadStripe('pk_test_51IbHarLk15zqG3FqAIpqPc0vFDQpQRLADB7RKQlvrwRVdHJgx0S4UMy014DDa4O9dmFRKuEMNC7kx0ZhkiMj41CC00QyNGxLnj')

const Checkout = ({ order, user, token }) => {
    const { firstName, lastName, address, city, state, zip } = user;
    console.log('this is the user in checkout', user)

    const handleClick = async (event) => {
      // Get Stripe.js instance
      const stripe = await stripePromise;

      // Call backend to create checkout sessions
      const rsp = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });

      const session = await rsp.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    }

    return (<div className='checkout'>

    <h3> welcome to checkout</h3>

    <Cart/>

    { token
    ?   <Account user={user} token={token} />
    : <h3> You must be a registered user before you can checkout. Please register <Link to='/register'>here.</Link></h3>

    }
    <br/>

    <button role="link" onClick={handleClick} > Complete Order </button>


    </div>)
}

export default Checkout;
