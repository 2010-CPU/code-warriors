import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Cart = ({token, user, order, setOrder}) => {
    const {id, datePlaced, status, products} = order;
    const [newQuantity, setNewQuantity] = useState(0);

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
            fetchCart();

            return data;
        } catch (error) {
            console.error(error)
        }
    }

    const handleCoupon = async (event) => {
        event.preventDefault();
    }

    const cartQuantity = [{label: 0, value: 0},{label: 1, value: 1},{label: 2, value: 2},{label: 3, value: 3},{label: 4, value: 4},{label: 5, value: 5},{label: 6, value: 6},{label: 7, value: 7},{label: 8, value: 8},{label: 9, value: 9}];

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
            {/* <h2>My Cart</h2>
            <p>Date Placed: {moment(datePlaced).format("LL")}</p>
            <p>Order ID: {id}</p>
            <p>Order Status: {status}</p> */}
            <div className="shopping-cart-container" >
            <div> <h2>Shopping Cart</h2>
                {products ? products.map((product) => {
                    const {id, imageURL, name, quantity, price} = product; 
                    return <div key={id}> 
                        <table className="cart-table"><tbody>
                        <tr><td><img className="cart-img" src={imageURL}/> </td>
                        <td><h4 className="prod-col" > {name}</h4></td>
                        <td><h4 >Quantity:
                        <select required name='quantity' selected={quantity} value={quantity} onChange={event => updateQuantity(product.id)}>
                            {cartQuantity.map((quant, index) => {
                                return <option key={index}>{`${quant.label}`}</option>
                            })}
                            
                        </select>   </h4></td>
                        <td><h4 className="sub-col" > ${price}.00</h4></td></tr></tbody></table>
                        <button className="btn" onClick={() => removeItem(product.id)}>remove</button> 
                    </div>
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
                {/* <table>
                    <colgroup>
                        <col  />
                    </colgroup>
                </table> */}
            </div> </div>}

    </div>
    )
}

export default Cart;
