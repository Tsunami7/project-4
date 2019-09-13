import React from 'react';

// This component handles our register form
const Register = (props) => {

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <p>Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        {/* ------ */}
        <p>Image Link:</p>
        <input name="image_link" type="text" value={props.formData.image_link} onChange={props.handleChange} />
        {/* {console.log(image_link)} */}
        <hr/>
        <p>Social URL:</p>
        <input name="social_link" type="text" value={props.formData.social_link} onChange={props.handleChange} />
        <hr/>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;