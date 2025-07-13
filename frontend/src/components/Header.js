import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const headerStyle = {
    background: '#333',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  };

  return (
    <header style={headerStyle}>
      <h1><Link to="/" style={{ ...linkStyle, fontSize: '1.5rem' }}>E-Commerce</Link></h1>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Products</Link>
        <Link to="/cart" style={linkStyle}>
          Cart ({cart.length})
        </Link>
        {user ? (
          <>
            <span>Welcome, {user.name || 'User'}!</span>
            <button onClick={logout} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;