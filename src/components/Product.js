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

const SmallProduct = ({product,reviews, setReviews, token, cart}) => {
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
    <div className="shop-container"> 
    <div className="small-prod-container"> 
    <div className="small-product">
    <Link to={`/products/${id}`}><img src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/> </Link> </div>
    <h1 className="prod-info">{name}<br/> ${price}</h1>
    <img className="rev-image" src={"images/5_stars.png" } alt={"5stars"}/>
    
    {/* <Reviews reviews={reviews} setReviews={setReviews} productId={id} />  */}
    
    <button onClick={addToCart}> add to cart </button>
    </div>
    </div>
  )
}

const Product = ({product, reviews, setReviews, cart, token}) => {
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

    return (<div className="prod-container"> 
    <div className="product">
    <img className='product-img' src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/>
    <div className="prod-details"> 
      <h1>{name}</h1>
      <h2>${price} - {inStock ? "In Stock!" : "Out of Stock!"}</h2>
      <h3>{category}</h3>
      <p>{description}</p>
      </div>
      <button className="btn" onClick={addToCart}> Add To Cart</button>
    </div>
    <div className="prod-reviews"> 
    <Reviews reviews={reviews} setReviews={setReviews} productId={id}/>
    </div>
     </div>
  )
}

const ProductsView = ({cart, token, reviews, setReviews}) => {
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

          <SmallProduct key={product.id} product={product} reviews={reviews} setReviews={setReviews} cart={cart} token={token}/>

        ))
      }
    </div>
  )
}

const ProductView = ({ reviews, setReviews, cart, token}) => {
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

  return (<>
    <Product product={product} reviews={reviews} setReviews={setReviews} cart={cart} token={token} />
    </>
  )
}

export {SmallProduct,Product,ProductsView,ProductView};
