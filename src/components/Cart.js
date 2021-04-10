import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {SmallProduct} from './Product'

const Cart = (props) => {
    const {token, user} = props
    const [cart, setCart] = useState({})

    const fetchCart = async () =>{
        try {
            const response = await axios.get('api/orders/cart',{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            const {data} = response
            if(data){
                setCart(data)
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        if(token){
            fetchCart()
        }
    }, [token])

    if(!token){
        return <div>you must be logged in to view this</div>
    }

    const removeItem = async(id) => {
        try {
          const op_rsp = await axios.get(`api/order_products/${cart.id}`); // Get all order products associated with cart
          const order_products = await op_rsp.data; // Destructure from response Object

          // Get the first order product that matches product id
          const [order_product] = order_products.filter((order_product) => {
            return order_product.productId === id;
          })
          
            const response = await axios.delete(`api/order_products/${order_product.id}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const {data} = await response
            fetchCart()
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart">

        <h2>My Cart</h2>
        <p>{cart.datePlaced}</p>
        <p>{cart.id}</p>
        <p>{cart.status}</p>
        <h3>Products</h3>
        <div className="shopping-cart-container" >
        <div > 
        <div className="cost-container" >
            </div>
        {
            cart.products ? cart.products.map((product) => {
                const {id, imageURL, name, quantity, price} = product; 
                return <Fragment key={product.id}> 
                <table className="cart-table"><tbody>
                <tr><td><img className="cart-img" src={imageURL}/> </td>
                <td><h4 className="prod-col" > {name}</h4></td>
                <td><h4 >Quantity: {quantity}</h4></td>
                <td><h4 className="sub-col" > ${price}.00</h4></td></tr></tbody></table>
                <button className="btn" onClick={removeItem}>remove</button> 
                </Fragment>
            })
            : ''
        }
        </div> 
        </div>

        <button className="btn"> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>
    )
}

export default Cart;
