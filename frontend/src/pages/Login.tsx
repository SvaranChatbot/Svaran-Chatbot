/* Kunal Sharma 2023UMA0221 Mathematics and Computing */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google authentication API call
    try {
      // Replace with actual Google authentication logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - successful login
      navigate('/chat');
    } catch (err) {
      console.error('Google login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container appear">
      <div className="login-card google-only">
        <div className="login-header">
          <div className="brand">
            <img src="/src/assets/icon.png" alt="Svaran" className="login-logo" />
            <h1>Svaran</h1>
          </div>
          <p>Welcome to Svaran AI Assistant</p>
        </div>
        
        <div className="google-login-wrapper">
          <button 
            className={`google-button ${isLoading ? 'loading' : ''}`}
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>
        
        <div className="login-footer">
          <p>By signing in, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a></p>
        </div>
      </div>
      
      <div className="login-illustration">
        <img src="/src/assets/vector.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Login;