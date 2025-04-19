/* Kunal Sharma 2023UMA0221 Mathematics and Computing */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    
    // Simulate Google authentication API call
    try {
      // Replace with actual Google authentication logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - successful signup and then navigate to onboarding or profile setup
      navigate('/onboarding');
    } catch (err) {
      console.error('Google signup failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container appear">
      <div className="signup-card google-only">
        <div className="signup-header">
          <div className="brand">
            <img src="/src/assets/icon.png" alt="Svaran" className="signup-logo" />
            <h1>Svaran</h1>
          </div>
          <p>Create your Svaran AI Assistant account</p>
        </div>
        
        <div className="google-signup-wrapper">
          <button 
            className={`google-button ${isLoading ? 'loading' : ''}`}
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign up with Google
              </>
            )}
          </button>
        </div>
        
        <div className="signup-footer">
          <p>By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a></p>
        </div>
        
        <div className="login-option">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
      
      <div className="signup-illustration">
        <img src="/src/assets/vector.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Signup;