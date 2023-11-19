import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h6>&copy; {new Date().getFullYear()}Note App</h6>
      </div>
    </footer>
  );
}

export default Footer;
