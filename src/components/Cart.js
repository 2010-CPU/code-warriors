import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { getAllProducts } from '../api';
import CartItem from './CartItem';

const Cart = ({token, order, setOrder}) => {
    const {products} = order;

    const fetchCart = async () => {
        try {
            const response = await fetch(`/api/orders/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            setOrder(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        fetchCart()
    }, []);

    const removeItem = async (id) => {
        try {
            const op_rsp = await axios.get(`/api/order_products/${order.id}`); // Get all order products associated with cart
            const order_products = await op_rsp.data; // Destructure from response Object

            // Get the first order product that matches product id
            const [order_product] = order_products.filter((order_product) => {
            return order_product.productId === id;
            });
          
            const response = await axios.delete(`/api/order_products/${order_product.id}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const {data} = await response;
            fetchCart();
        } catch (error) {
            console.error(error)
        }
    }

    const handleCoupon = async (event) => {
        event.preventDefault();
    }

    const subtotal = products ? products.map((product) => {
        const {id, imageURL, name, quantity, price} = product; 
        return price
        })
        : '';

    const cartTotal = subtotal ? subtotal.reduce((a,b) => a + b, 0) 
        : '';

    return (
        <div className="cart">

        {order.products ?  
            <>
            <div className="shopping-cart-container" >
            <div> <h2>Shopping Cart</h2>

                {products ? products.map((product) => {
                    return <CartItem key={product.id} token={token} product={product} removeItem={removeItem} order={order} fetchCart={fetchCart} />
                }) : 
                ''}

                <div className='cart-tot'> 
                <Link to='/products'><button className="btn" > continue shopping </button></Link> <Link to='/cart'><button className='btn'>UPDATE CART</button></Link>
                
                    <div><h2>Promotion Code</h2>
                    <div>
                        <input type='text' placeholder='coupon code' ></input>
                        <button className='btn' onClick={handleCoupon} >Apply Code</button>
                    </div></div>
                    <div><h2 className='cart-h2'>Cart Totals</h2>
                    <div className="sub-tot">
                        <div>Subtotal</div><div>${cartTotal}.00</div> 
                        <div>Total</div><div>${cartTotal}.00</div></div></div>
                    
                </div>
            </div> 
            </div>

            <Link to='/cart/checkout'><button className="btn"> Proceed to Checkout </button></Link>
            </>
        : <div className='empty-cart'>
            <div className="inner-cart"> You have not yet started an order!
            </div> </div>}

    </div>
    )
}

export default Cart;
