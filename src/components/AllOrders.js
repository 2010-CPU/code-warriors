import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import moment from 'moment';

//use a piece of state and a ternary that shows product details
//if showProduct is true and id is id tied to this product, then show
//boolean and orderId on the state
//ternary for detail would check if orderId matches the id and the boolean is true
//onClick of the product, it would set the state for true and change the id 

const AllOrders = ({token, user}) => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await fetch('/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('data: ', data)
        setOrders(data);
    }

    useEffect( () => {
        getOrders();
    }, [])

    if (user.isAdmin) {
        return (<div className='all-orders'>
            <h2>Orders History</h2>
            <div className='orders-list'>
                {orders.map(order => {
                    const {id, datePlaced, status, products, userId} = order;

                    return (<div className='single-order' key={id}>
                        <br />
                        <div>Order ID: {id}</div>
                        <div>Status: {status}</div>
                        <div>Date Placed: {moment(datePlaced).format("LL")}</div>
                        <div>User ID: {userId}</div>

                        <div className='order-products'>
                            {products.map(product => {
                                const {id, name, price, quantity} = product;

                                return (<div className='single-product' key={id}>
                                    <div>Product: {name}</div>
                                    <div>Number Purchased: {quantity}</div>
                                    <div>Total Price: ${price}</div>
                                    <br />
                                </div>)
                            })}
                        </div>
                    </div>)
                })}
            </div>
        </div>)
    } else {
        return <Redirect to ='/' />
    }

}

export default AllOrders;