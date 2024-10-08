import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
  { id: 1, name: 'Product 1', price: '10', description: 'This is the first product.' },
  { id: 2, name: 'Product 2', price: '20', description: 'This is the second product.' },
  { id: 3, name: 'Product 3', price: '30', description: 'This is the third product.' },
  { id: 4, name: 'Product 4', price: '40', description: 'This is the fourth product.' },
  { id: 5, name: 'Product 5', price: '50', description: 'This is the fifth product.' },
  ],
  showForm: false,
  newProduct: {
    name: '',
    price: '',
    description: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    updateNewProductField: (state, action) => {
      const { field, value } = action.payload;
      state.newProduct[field] = value;
    },
    resetNewProduct: (state) => {
      state.newProduct = { name: '', price: '', description: '' };
    },
  },
});

export const {
  addProduct,
  removeProduct,
  setShowForm,
  updateNewProductField,
  resetNewProduct,
} = productSlice.actions;

export default productSlice.reducer;