import React, {useEffect, useState, useRef} from 'react';
import { useAuth } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom"

const Auth = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    document.title = `SignIn: Ataraxia`;
  });

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  };

  return (
    <div className="signup-form-container">
  <div className="signup-header">
    <h2>Welcome Back!</h2>
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

    <button disabled={loading} type="submit">Submit</button>
    <label className="form-text">Need an account? <Link to="/auth">Sign Up</Link></label>
  </form>
</div>
  );
}

export default Auth;