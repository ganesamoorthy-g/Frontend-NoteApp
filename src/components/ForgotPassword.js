import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false); // Add this line
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/auth/forgot-password`, { email })
      .then((res) => {
        if (res.data.status === 'Password reset link sent successfully') {
          setResetLinkSent(true);

          // Automatically navigate to the login page after 5 seconds (adjust as needed)
          setTimeout(() => {
            setResetLinkSent(false);
            navigate('/login');
          }, 3000);
        }
      })
      .catch((err) => {
        // Handle error
        // console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>

        {/* Show success message */}
        {resetLinkSent && (
  <p style={{ color: 'black' }}>
    Password reset link sent to your email. Please check your inbox.
  </p>
)}

      </div>
    </div>
  );
}

export default ForgotPassword;
