import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';

// maybe need async await with the useEffect?

const Cart = () => {

    return (<div className='cart'>
        <div>This page has been left blank intentionally. Come back and check out your cart soon!</div>
    
    <button> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>)
}

export default Cart;