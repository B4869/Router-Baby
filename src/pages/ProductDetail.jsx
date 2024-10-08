import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../productDetail.css';


function ProductDetail() {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(productId)));
  
  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">{product.name}</h2>
      <p className="product-detail-price">Price: {'$' + product.price}</p>
      <p className="product-detail-description">Description: {product.description}</p>
      <Link to="/" className="back-link">Back to Product List</Link>
    </div>
  );
}

export default ProductDetail;