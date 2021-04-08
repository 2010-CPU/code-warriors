import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link
} from 'react-router-dom';

import {
  getAllProducts,
  getProductById
} from '../api';

import {Reviews} from './index';

const SmallProduct = ({product,reviews, setReviews}) => {
  const {id,name,price,inStock,imageURL} = product;

  return (
    <div className="shop-container"> 
    <div className="small-prod-container"> 
    <div className="small-product">
    <Link to={`/products/${id}`}><img src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/> </Link> </div>
    <h1 className="prod-info">{name}<br/> ${price}</h1>
    <img className="rev-image" src={"images/5_stars.png" } alt={"5stars"}/>
    
    {/* <Reviews reviews={reviews} setReviews={setReviews} productId={id} />  */}
    
    </div>
    </div>
  )
}

const Product = ({product, reviews, setReviews}) => {
  const {id,name,price,inStock,category,description,imageURL} = product;

  return (<div className="prod-container"> 
    <div className="product">
    <img className='product-img' src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/>
    <div className="prod-details"> 
      <h1>{name}</h1>
      <h2>${price} - {inStock ? "In Stock!" : "Out of Stock!"}</h2>
      <h3>{category}</h3>
      <p>{description}</p>
      </div>
      <button className="btn"> Add To Cart</button>
    </div>
    <div className="prod-reviews"> 
    <Reviews reviews={reviews} setReviews={setReviews} productId={id}/>
    </div>
     </div>
  )
}

const ProductsView = ({reviews, setReviews}) => {
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
          <SmallProduct key={product.id} product={product} reviews={reviews} setReviews={setReviews}/>

        ))
      }
    </div>
  )
}

const ProductView = ({reviews, setReviews}) => {
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
    <Product product={product} reviews={reviews} setReviews={setReviews} />
    </>
  )
}

export {Product,ProductsView,ProductView};
