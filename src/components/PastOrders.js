import React from 'react';
import moment from 'moment';

const PastOrders = ({order}) => {
    const {id, status, datePlaced, products} = order;

    let totalCost = 0;
    if (Object.keys(order).length > 0) {
        let totalPrice = 0
        order.products.forEach(product => {
            let currentPrice = (product.price * product.quantity)
            totalPrice += currentPrice
        })
        totalCost = totalPrice
    }

    return (<div className='past-orders'>
        <div>Order ID: {id}</div>
        <div>Status: {status}</div>
        <div>Date Placed: {moment(datePlaced).format("LL")}</div>
        <div>Total Cost: ${totalCost}.00 </div>

        <div className='order-products'>
            {products.map(product => {
                const {id, name, price, quantity} = product;

                return (<div className='single-product' key={id}>
                    <br />
                    <div>Product: {name}</div>
                    <div>Number Purchased: {quantity}</div>
                    <div>Price: ${price}.00</div>
                    <button className='btn'>Review Product</button>

                </div>)
            })}
        </div>
        <br />
    </div>)
}

export default PastOrders;