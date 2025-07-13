import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: '#e74c3c' }}>{error}</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '2rem' }}>Product not found</div>;

  const containerStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '500',
    marginRight: '1rem'
  };

  return (
    <div style={containerStyle}>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
        ← Back to Products
      </Link>
      
      <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>{product.name}</h1>
      <p style={{ color: '#7f8c8d', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{product.description}</p>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
          ${parseFloat(product.price).toFixed(2)}
        </span>
        <span style={{ marginLeft: '1rem', color: '#95a5a6' }}>
          Stock: {product.stock}
        </span>
      </div>

      <button 
        onClick={() => addToCart(product)}
        style={buttonStyle}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductDetail;