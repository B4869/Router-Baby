// src/components/Products.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addProduct,
  removeProduct,
  setShowForm,
  updateNewProductField,
  resetNewProduct,
} from '../features/productSlice';
import '../product.css';

function Products() {
  const dispatch = useDispatch();
  const { products: productList, showForm, newProduct } = useSelector((state) => state.products);

  const handleAddProduct = (e) => {
    e.preventDefault();

    const maxId = productList.reduce((max, product) => (product.id > max ? product.id : max), 0);
    const productToAdd = { ...newProduct, id: maxId + 1 };

    dispatch(addProduct(productToAdd));

    dispatch(resetNewProduct());
    dispatch(setShowForm(false));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleShowForm = () => {
    dispatch(setShowForm(true));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNewProductField({ field: name, value }));
  };

  const handleCancel = () => {
    dispatch(resetNewProduct());
    dispatch(setShowForm(false));
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Product List</h2>
      <ul className="product-list">
        {productList.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-info">
              <Link to={`/product/${product.id}`} className="product-link">
                <span className="product-name">{product.name}</span>
                <span className="product-price">{'$' + product.price}</span>
              </Link>
            </div>
            <button className="remove-button" onClick={() => handleRemoveProduct(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {showForm ? (
        <form className="product-form" onSubmit={handleAddProduct}>
          <div className="form-group">
            <label className="form-label">Product Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price:</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Product Details:</label>
            <input
              type="text"
              name="description"
              placeholder="Product details"
              value={newProduct.description}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="add-button" onClick={handleShowForm}>
          Add Product
        </button>
      )}
    </div>
  );
}

export default Products;
