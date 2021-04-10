import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

const ProductForm = ({user, token, getProducts, product, setProduct}) => {
    const {name, price, inStock, category, description, imageURL} = product;

    const [addMessage, setAddMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` //might not need token
            },
            body: JSON.stringify({
                name, 
                price, 
                inStock, 
                category, 
                description, 
                imageURL
            })
        })
        const data = await response.json();
        setProduct(data);
        setAddMessage(data ? 'Product has been added' : 'Oh no... Something went wrong.')
    }

    useEffect( () => {
        getProducts();
    }, []);

    if (user.isAdmin) {
        return (<div className='add-product'>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Add Product</button>
            </form>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default ProductForm;