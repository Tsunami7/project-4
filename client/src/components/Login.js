import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    <div className="auth-container">
      <h2 className='login-title'>login</h2>
      <hr />
      <form className='login-box' onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
      }} >
        <div className='login-text-box'>
          <div className='username-box'>
            <p>Username:</p>
            <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
          </div>
          <div className='password-box'>
            <p>Password:</p>
            <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
          </div>
        </div>
        <hr />
        <div className='login-buttons'>
          <button>Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;