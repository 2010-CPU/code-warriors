import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link
} from 'react-router-dom';

import {
  getAllProducts,
  getProductById
} from '../api';
import { Reviews } from './Reviews';

const SmallProduct = ({product}) => {
  const {id,name,price,inStock,imageURL} = product;

  return (
    <div className="bg-image img1"> 
    <div className="small-product">
    <img src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/>
    <h1><Link to={`/products/${id}`}>{name}</Link> - ${price}</h1>
    <button> add to cart </button>
    </div>
    </div>
  )
}

const Product = ({product}) => {
  const {id,name,price,inStock,category,description,imageURL} = product;

  return (
    <div className='bg-image img1'> 
    <div className="product">
      <h1>{name}</h1>
      <h2>${price} - {inStock ? "In Stock!" : "Out of Stock!"}</h2>
      <h3>{category}</h3>
      <p>{description}</p>
      <img className='product-img' src={imageURL ? imageURL : "/images/no-image.png"} alt={name}/>
      <button> ADD TO CART </button>
    </div> </div>
  )
}

const ProductsView = () => {
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
          <SmallProduct key={product.id} product={product} />
        ))
      }
    </div>
  )
}

const ProductView = () => {
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
    <Product product={product} />
    </>
  )
}

export {Product,ProductsView,ProductView};
