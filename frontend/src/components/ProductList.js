import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Product: ", products)

  if (loading) return <div>Loading products...</div>;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    padding: '1rem'
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '0.5rem'
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={gridStyle}>
        {products.map(product => (
          <div key={product.id} style={cardStyle}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <p>Stock: {product.stock}</p>
            <div>
              <Link to={`/product/${product.id}`}>
                <button style={{ ...buttonStyle, marginRight: '0.5rem' }}>View Details</button>
              </Link>
              <button 
                onClick={() => addToCart(product)}
                style={buttonStyle}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;