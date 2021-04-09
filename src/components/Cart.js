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

    const removeItem = async() => {
        try {
            const response = await axios.delete('api/orders/cart',{
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
    useEffect(() =>{
        if(token){
            fetchCart()
        }
    }, [token])

    if(!token){
        return <div>you must be logged in to view this</div>
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
            cart.products ? cart.products.map((product, idx) => {
                return <> 
                <table className="cart-table" key={product.id}>
                <tr><td><img className="cart-img" key={idx-1}src={product.imageURL}/> </td>
                <td><h4 className="prod-col" key={idx-200}> {product.name}</h4></td>
                <td><h4 key={idx-300}>Quantity: {product.quantity}</h4></td>
                <td><h4 className="sub-col" key={idx-4}> ${product.price}.00</h4></td>
                <button className="btn" onClick={removeItem}>remove</button> </tr>
                
                </table>
                
                </>
            }) : null
        }
        </div> 
        </div>

    <button className="btn"> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>)
}

export default Cart;
