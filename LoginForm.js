import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginMessage, setLoginMessage] = useState({ message: '', isSuccess: null });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginMessage({ message: '', isSuccess: null });

    let isValid = true;

    // Validate email
    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    }

    // Validate password
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (isValid) {
      loginUser();
    }
  };

  const loginUser = () => {
    const loginData = {
      username: email,
      password: password,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginMessage({ message: 'Login successful!', isSuccess: true });
      })
      .catch((error) => {
        setLoginMessage({ message: 'Login failed!', isSuccess: false });
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <div className="input-group">
          <button type="submit">Login</button>
        </div>
        {loginMessage.message && (
          <p className={loginMessage.isSuccess ? 'success-message' : 'error-message'}>
            {loginMessage.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
