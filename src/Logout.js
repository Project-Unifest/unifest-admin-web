import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
