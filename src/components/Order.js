import React, {useEffect} from 'react';

// will need to add products in the order

const Order = ({token, order, setOrder}) => {
    const {id, status, userId, datePlaced} = order;
    console.log('order: ', order);

    const getOrder = async () => {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('data: ', data)
        setOrder(data);
    }

    useEffect(async () => {
        await getOrder();
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