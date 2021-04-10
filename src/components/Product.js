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

const SmallProduct = ({product,reviews, setReviews, token, cart}) => {
  const {id,name,price,inStock,imageURL} = product;
  console.log(cart)
  
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
  const shopReviews = reviews.filter((review) => {
    if(product.id === review.productId){
      return review
    }
  })
  const stars = shopReviews.map((review) => { 
    return review.stars
  })
  const avgStars = stars.reduce((a,b) => a + b, 0) / stars.length

  return (
    <div className="shop-container"> 
    <div className="small-prod-container"> 
    <div className="small-product">
    <Link to={`/products/${id}`}><img src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/> </Link> </div>
    <h1 className="prod-info">{name}<br/> ${price}</h1>
    <h2 className="rev-image">{avgStars > 4 
    ? <img className="rev-image" src={'/images/5.stars.png'}/> 
    : <img className="rev-image" src={'/images/4_stars.png'}/>}</h2> 
    <button className="btn" onClick={addToCart}> add to cart </button>
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

  const prodReviews = reviews.filter( review => { 
    if(product.id === review.productId) { 
        return review;
    }
})
console.log(prodReviews)

  return (<>
  <button className={'btn'} >  Return To Shop</button>
    <Product product={product} reviews={reviews} setReviews={setReviews} cart={cart} token={token}  />
    <div className="prod-reviews"> 
    <h2> See what our customers have to say about {product.name}:</h2> <br/>

      {prodReviews.map((review,idx) => { 
        const {title, content, stars} = review;
        return <>
        <h3 > {title} Star Rating: {stars}</h3> 
        <div > {content} </div> <br/> 
        </>
      })}
    </div>
    </>
  )
}

export {SmallProduct,Product,ProductsView,ProductView};
