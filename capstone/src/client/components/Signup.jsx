import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate for routing
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // initialize useNavigate
  const { signup } = useAuth(); // Use signup function from AuthContext

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const signupFunction = async () => {
    try {
      if (password !== passwordConfirmation) {
        setMessage('Passwords do not match.');
        return;
      }
      const result = await signup(username, email, password); // Use signup from AuthContext
      setMessage(result.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      navigate('/login'); // navigate to login page
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
      setMessage(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupFunction();
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Confirm Password:</label>
          <input
            type='password'
            id='passwordConfirmation'
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;

