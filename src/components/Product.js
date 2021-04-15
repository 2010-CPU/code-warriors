import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useParams,
  Link,
  useHistory
} from 'react-router-dom';

import {
  getProductById
} from '../api';

const SmallProduct = ({product, reviews, setReviews, token, order}) => {
  const {id,name,price,inStock,imageURL} = product;
  
  const addToCart = async () => {
    try {
      const response = await axios.post(`/api/orders/${order.id}/products`,{
        productId: id, 
        price: price, 
        quantity: 1
      },{
        headers: {
          "content-type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })
      const {data} = await response;
    } catch (error) {
      console.error(error)
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
    ? <img className="rev-image" src={'/images/5_stars.png'}/> 
    : <img className="rev-image" src={'/images/4_stars.png'}/>}</h2> 
    <button className="btn" onClick={addToCart}> add to cart </button>
    </div>
    </div>
  )
}

const Product = ({product, reviews, setReviews, order, token}) => {
  const {id,name,price,inStock,category,description,imageURL} = product;
  


  const addToCart = async () => {
    try {
      const response = await axios.post(`/api/orders/${order.id}/products`,{
        productId: id, 
        price: price, 
        quantity: 1
      },{
        headers: {
          "content-type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      })
      const {data} = await response;
    } catch (error) {
      console.error(error)
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

const ProductsView = ({order, token, user, products, getProducts, reviews, setReviews}) => {

  useEffect(() => {
    getProducts();
  },[]);

  return (<>
    <div id='shop-head'> <h2>Food With Friends</h2>
    <h3>We're adding new meal kits every week. Check back often to enjoy new offerings.</h3></div>
    <div className="products">
      
      {
        products.map(product => (
          
          <SmallProduct key={product.id} product={product} reviews={reviews} setReviews={setReviews} order={order} token={token}/>

          ))
      }
            {user.isAdmin ? <Link to='/products/add'><button className="btn">Add A New Product</button></Link> : ''}

    </div>
    </>
  )
}

const ProductView = ({user, order, token, product, setProduct, getProducts, reviews, setReviews}) => {
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

  let history = useHistory();
  const goToPreviousPath = () => {
    history.push('/products') }

  const handleDelete = async (id) => {
    if (user.isAdmin) {
      try {
        const response = await axios.delete(`/api/products/${id}`, { 
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const {data} = await response;
        setProduct(data);
        getProducts();
        history.push('/products');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const prodReviews = reviews.filter( review => { 
    if(product.id === review.productId) { 
      return review;
    }
  })

  return (<>
    <button className={'btn'} onClick={goToPreviousPath} >  Return To Shop</button>
    {user.isAdmin ? <Link to={`/products/edit/${product.id}`}><button className="btn-product" >Edit Product</button></Link> : ''}
    {user.isAdmin ? <button className="btn-product" onClick={() => handleDelete(product.id)} >Delete Product</button> : ''}
    <Product product={product} reviews={reviews} setReviews={setReviews} order={order} token={token} key={product.id}  />
    <div className="prod-reviews"> 
    <h2> See what our customers have to say about {product.name}:</h2> <br/>

      {prodReviews.map((review,idx) => { 
        const {title, content, stars} = review;
        return <div key={idx}>
        <h3 > {title} Star Rating: {stars}</h3> 
        <div > {content} </div> <br/> 
        </div>
      })}
    </div>
    </>
  )
}

export {SmallProduct,Product,ProductsView,ProductView};
