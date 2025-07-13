import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const containerStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem'
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const quantityStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  if (cart.length === 0) {
    return (
      <div style={{ ...containerStyle, textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Shopping Cart</h2>
      
      {cart.map(item => (
        <div key={item.id} style={itemStyle}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{item.name}</h4>
            <p style={{ margin: '0', color: '#7f8c8d' }}>${parseFloat(item.price).toFixed(2)} each</p>
          </div>
          
          <div style={quantityStyle}>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              style={{ ...buttonStyle, background: '#95a5a6' }}
            >
              -
            </button>
            <span style={{ padding: '0.5rem', minWidth: '2rem', textAlign: 'center' }}>
              {item.quantity}
            </span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{ ...buttonStyle, background: '#27ae60' }}
            >
              +
            </button>
            <button 
              onClick={() => removeFromCart(item.id)}
              style={{ ...buttonStyle, marginLeft: '1rem' }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      
      <div style={{
        borderTop: '2px solid #ecf0f1',
        paddingTop: '1rem',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ color: '#2c3e50' }}>Total: ${getCartTotal().toFixed(2)}</h3>
        </div>
        
        <div>
          <button 
            onClick={clearCart}
            style={{ ...buttonStyle, marginRight: '1rem' }}
          >
            Clear Cart
          </button>
          <button 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1.1rem',
              padding: '0.75rem 1.5rem'
            }}
          >
            Checkout
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;