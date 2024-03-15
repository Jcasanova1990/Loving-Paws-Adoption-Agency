import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from './AuthPage.module.scss'; 

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignUp = async (userData) => {
    try {
      // Call the signUp function passed from props
      await props.signUp(userData);
      // Redirect to home page after sign-up
      navigate('/');
    } catch (error) {
      // Handle sign-up error
      console.error('Error signing up:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      // Call the login function passed from props
      await props.login(userData);
      // Redirect to home page after login
      navigate('/');
    } catch (error) {
      // Handle login error
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={styles['auth-page-container']}>
      <button className={styles['auth-toggle-button']} onClick={() => setShowLogin(!showLogin)}>
        {!showLogin ? 'Already Have An account. Click Here To Sign In' : 'New Here. Click Here Sign Up'}
      </button>
      {!showLogin ? <SignUpForm signUp={handleSignUp} /> : <LoginForm login={handleLogin} />}
    </div>
  );
}
