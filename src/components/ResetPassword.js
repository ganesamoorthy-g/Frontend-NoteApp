import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_BASE_URL = 'https://backend-noteapp-m3mt.onrender.com'; // Change this to your actual base URL

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false); // Add this line
  const navigate = useNavigate();

  const [state] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/reset-password?id=${state.get("id")}&token=${state.get("token")}`,
        {
          password,
        }
      );

      if (response.data.message === 'Password reset successfully') {
        setResetSuccess(true);

        // Automatically navigate to the login page after 5 seconds (adjust as needed)
        setTimeout(() => {
          setResetSuccess(false);
          navigate('/login', { replace: true });
        }, 5000);
      } else {
        // Handle other cases where the reset might not have been successful
        // console.log('Password reset failed');
      }
    } catch (error) {
      
      // Handle error
      // console.log('Password reset failed:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>

        {resetSuccess && (
  <p style={{ color: 'black' }}>
    Password reset successfully. Redirecting to login...
  </p>
)}


        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              className="form-control rounded-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
