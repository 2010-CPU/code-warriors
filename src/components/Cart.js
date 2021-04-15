import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CartItem from './CartItem';

const Cart = ({token, user, order, setOrder, fetchOrder}) => {
    const {id, datePlaced, status, products} = order;
    const [newQuantity, setNewQuantity] = useState(0);

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

            const nextOrder = await fetchOrder(token);
            setOrder(nextOrder);

            return data;
        } catch (error) {
            console.error(error)
        }
    }

    const updateQuantity = async (id) => {

        try {
            const op_rsp = await axios.get(`/api/order_products/${order.id}`);
            const order_products = await op_rsp.data;
            const [order_product] = order_products.filter((order_product) => {

            return order_product.productId === id;

            });
          const {quantity} = order_product;
            const response = await axios.patch(`/api/order_products/${order_product.id}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    quantity
                }
            });
            const {data} = await response;

            const nextOrder = await fetchOrder(token);
            setOrder(nextOrder);

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    let cartTotal = 0
    if (Object.keys(order).length > 0) {
        let totalPrice = 0
        order.products.forEach(product => {
            let currentPrice = (product.price * product.quantity)
            totalPrice += currentPrice
        })
        cartTotal = totalPrice
    }

    return (
        <div className="cart">

        {order.products ?
            <>
            <div className="shopping-cart-container" >
            <div>
            <h2>Shopping Cart</h2>
            {products ? products.map((product) => {
                return <CartItem key={product.id} token={token} product={product} removeItem={removeItem} order={order} fetchOrder={fetchOrder} setOrder={setOrder}/>
            }) :
            ''}

                <div className='cart-tot'>
                <Link to='/products'><button className="btn" > continue shopping </button></Link>

                    <div><h2 className='cart-h2'>Order Summary</h2>
                    <div className="sub-tot">
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
