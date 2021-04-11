import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Cart = ({token, user, order, setOrder}) => {
    const {id, datePlaced, status, products} = order;

    const fetchCart = async () =>{
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
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="cart">

        {order.products ?  
            <>
            <h2>My Cart</h2>
            <p>Date Placed: {moment(datePlaced).format("LL")}</p>
            <p>Order ID: {id}</p>
            <p>Order Status: {status}</p>
            <div className="shopping-cart-container" >
            <div>
                {products ? products.map((product) => {
                    const {id, imageURL, name, quantity, price} = product; 

                    return <div key={id}> 
                        <table className="cart-table"><tbody>
                        <tr><td><img className="cart-img" src={imageURL}/> </td>
                        <td><h4 className="prod-col" > {name}</h4></td>
                        <td><h4 >Quantity: {quantity}</h4></td>
                        <td><h4 className="sub-col" > ${price}.00</h4></td></tr></tbody></table>
                        <button className="btn" onClick={() => removeItem(product.id)}>remove</button> 
                    </div>
                }) : 
                ''}
            </div> 
            </div>

            <Link to='/cart/checkout'><button className="btn"> CHECKOUT </button></Link>
            </>
        : <div>You have not yet started an order!</div>}

    </div>
    )
}

export default Cart;
