import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';

const Cart = ({product}) => {

    return (<div className="shopping-cart-container" >
        <div className="cart-table"> 
        <div className="prod-col"> PRODUCT </div>
        <div className="price-col"> PRICE</div>
        <div className="quant-col"> QUANTITY</div>
        <div className="sub-col"> SUBTOTAL</div>
        </div>
        <button> <Link to='/products'/>continue shopping</button>
        <div className="cost-container"> </div>

        
    
    <button> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>)
}

export default Cart;