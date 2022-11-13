import React, {useEffect, useState, useRef} from 'react';
import { useAuth } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom"


const Auth = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    document.title = `SignUp: Ataraxia`;
  });

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  };

  return (
    <div className="signup-form-container">
  <div className="signup-header">
    <h2>Create Account</h2>
    {error && <small className="errorMessage">{error}***</small>}
  </div>
  <form onSubmit={handleSubmit} className="signup-form">

    {/*EMAIL FIELD*/}
    <div className="form-control" id="email">
      <label>Email</label>
      <input placeholder="" type="email" ref={emailRef} required />
    </div>
    
    {/*PASSWORD FIELD*/}
    <div className="form-control" id="password">
      <label>Password</label>
      <input placeholder="" type="password" ref={passwordRef} required />
    </div>
    
    {/*CONFIRM PASSWORD FIELD*/}
    <div className="form-control" id="password-confirm">
      <label>Password check</label>
      <input placeholder="" type="password" ref={passwordConfirmRef} required />
    </div>

    <button className="signUp-Btn" disabled={loading} type="submit">Submit</button>
    <label className="form-text">Already have an account? <Link to="/signin">Sign In</Link></label>
  </form>
</div>
  );
}

export default Auth;
