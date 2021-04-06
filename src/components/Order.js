import React, {useEffect} from 'react';

// will need to add products in the order

const Order = ({token, order, setOrder}) => {
    const {id, status, userId, datePlaced} = order;

    const getOrder = async () => {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setOrder(data);
    }

    useEffect( () => {
        getOrder();
    }, [])

    return (<div className='order'>
        <div>Order Information</div>
        <div>Order Status: {status}</div>
        <div>Ordered By: User ID {userId}</div>
        <div>Date Placed: {datePlaced}</div>
        <br />
        <div>Products Ordered</div>
        <div>hold for products!!!!</div>
    </div>)
}

export default Order;