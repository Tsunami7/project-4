import React from 'react';
import '../styles/Register.css';

// This component handles our register form
const Register = (props) => {

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
        <p>Username:</p>
        <input class='register-field' name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <p>Email:</p>
        <input class='register-field' name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <p>Password:</p>
        <input class='register-field' name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        {/* ------ */}
        <p>Image Link:</p>
        <input class='register-field' name="image_link" type="text" value={props.formData.image_link} onChange={props.handleChange} />
        {/* {console.log(image_link)} */}
        
        <p>Social URL:</p>
        <input class='register-field' name="social_url" type="text" value={props.formData.social_url} onChange={props.handleChange} />
        <hr/>
        <button className='buttons'>Register</button>
      </form>
    </div>
  );
}

export default Register;