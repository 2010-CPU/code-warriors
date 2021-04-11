import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

<<<<<<< HEAD
const Cart = ({token, user, cart, setCart}) => {
    const [quantity, setQuantity] = useState(1)

    // const fetchCart = async () =>{
    //     try {
    //         const response = await axios.get('api/orders/cart',{
    //             headers:{
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         const {data} = response
    //         if(data){
    //             setCart(data)
    //         }
    //     } catch (error) {
    //     }
    // }
    // useEffect(() => {
    //     if(token){
    //         fetchCart()
    //     }
    // }, [token])

    // if(!token){
    //     return <div>you must be logged in to view this</div>
    // }
=======
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
>>>>>>> dev

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
<<<<<<< HEAD
            })
            const {data} = await response
            // fetchCart()
=======
            });
            const {data} = await response;
            fetchCart();
>>>>>>> dev
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    const updateQuantity = async (event) => { 
        event.preventDefault();
        setQuantity(event.target.value)
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
<<<<<<< HEAD
        {
            cart.products ? cart.products.map((product) => {
                const {id, imageURL, name, quantity, price} = product; 
                return <Fragment key={product.id}> 
                <table className="cart-table"><tbody>
                <tr><td><img className="cart-img" src={imageURL}/> </td>
                <td><h4 className="prod-col" > {name}</h4></td>
                <td><select name='quantity' value='this is the value'  option='options' selected='selected'></select></td>
                <td><h4 className="sub-col" > ${price}.00</h4></td></tr></tbody></table>
                <button className="btn" onClick={removeItem}>remove</button> 
                
                </Fragment>
            })
            : ''
        }
        </div> 
        </div>
=======
>>>>>>> dev

            <Link to='/cart/checkout'><button className="btn"> CHECKOUT </button></Link>
            </>
        : <div>You have not yet started an order!</div>}

    </div>
    )
}

export default Cart;
