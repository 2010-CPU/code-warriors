import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useParams,
  Link
} from 'react-router-dom';

import {
  getAllProducts,
  getProductById
} from '../api';

import {Reviews} from './index';

const SmallProduct = ({product, token, cart}) => {
  const {id,name,price,inStock,imageURL} = product;
  
  const addToCart = async () => {
    try {
      const response = await axios.post(`/api/orders/${cart.id}/products`,{
        productId:id, price: price, quantity: 1
      },{
        headers: {
          "content-type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-image img1"> 
    <div className="small-product">
    <img src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/>
    <h1><Link to={`/products/${id}`}>{name}</Link> - ${price}</h1>
    <button onClick={addToCart}> add to cart </button>
    </div>
    </div>
  )
}

const Product = ({product, cart, token}) => {
  const {id,name,price,inStock,category,description,imageURL} = product;

  const addToCart = async () => {
    try {
      const response = await axios.post(`/api/orders/${cart.id}/products`,{
        productId:id, price: price, quantity: 1
      },{
        headers: {
          "content-type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-image img1'> 
    <div className="product">
      <h1>{name}</h1>
      <h2>${price} - {inStock ? "In Stock!" : "Out of Stock!"}</h2>
      <h3>{category}</h3>
      <p>{description}</p>
      <img className='product-img' src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/>
      <button onClick={addToCart}> ADD TO CART </button>
    </div> </div>
  )
}

const ProductsView = (props) => {
  const{cart, token} = props
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const _products = await getAllProducts();
        setProducts(_products);
      } catch (err) {
        console.error(err);
      }
    }

    getProducts();
  },[]);
  return (
    <div className="products">
      {
        products.map(product => (
          <SmallProduct key={product.id} product={product} cart={cart} token={token}/>
        ))
      }
    </div>
  )
}

const ProductView = (props) => {
  const{cart, token} = props
  const [product, setProduct] = useState({});
  const {productId} = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const _product = await getProductById(productId);

        setProduct(_product);
      } catch (err) {
        console.error(err);
      }
    }

    getProduct();
  }, [productId]);

  return (
    <Product product={product} cart={cart} token={token}/>
  )
}

export {SmallProduct,Product,ProductsView,ProductView};
