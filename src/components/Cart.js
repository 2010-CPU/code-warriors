import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';

// maybe need async await with the useEffect?

const Cart = () => {
    // const [cart, setCart] = useState({});

    // const getCart = async () => {
    //     const response = await fetch(`/api/orders/cart`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'Application/json'
    //         }
    //     });
    //     const data = await response.json();
    //     console.log('data: ', data);
    //     setCart(data);
    // }

    // useEffect( () => {
    //     getCart();
    // })

    return (<div className='cart'>
        <div>This page has been left blank intentionally. Come back and check out your cart soon!</div>
    
    <button> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>)
}

export default Cart;