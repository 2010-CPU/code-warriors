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

    return (<div className='bg-image img1'>
        <div className="cart">

        <h2>My Cart</h2>
        <p>{cart.datePlaced}</p>
        <p>{cart.id}</p>
        <p>{cart.status}</p>
        <h3>Products</h3>
        {
            cart.products ? cart.products.map((product) => {
                return <Fragment key={product.id}>
                <h4>Quantity: {product.quantity}</h4>
                <SmallProduct product={product}/>
                
                </Fragment>
            }) : null
        }
        </div>

        
    
    <button> <Link to='/cart/checkout'> CHECKOUT </Link> </button>
    </div>)
}

export default Cart;