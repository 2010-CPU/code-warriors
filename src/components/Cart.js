import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';

const Cart = ({product}) => {

    return (<div className='bg-image img1'>
        <div>This page has been left blank intentionally. Come back and check out your cart soon!</div>

        
    
    <button> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>)
}

export default Cart;