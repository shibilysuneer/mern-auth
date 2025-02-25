import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Oauth from '../component/Oauth';
import { validateUsername,validateEmail,validatePassword } from '../../validation';

const Signup = () => {

  const [formData,setFormData] = useState({})
  const [validationErrors, setValidationErrors] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    let errors = {};
    
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
      errors.username = "Username must be 3-15 alphanumeric characters";
    }
     if (!formData.email) {
        errors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        errors.email = "Invalid email format";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (!validatePassword(formData.password)) {
        errors.password = "Password must be at least 4 characters, include a number & special character";
      }

    // If errors exist, update state & prevent API call
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false)
      if(data.success==false){
        setError(true);
        return;
      }
       navigate('/signin');
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
  <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
    <div className="bg-white/10 border border-gray-300 backdrop-blur-lg  rounded-lg p-8 shadow-lg max-w-md w-full">
      <h1 className='text-3xl text-center text-white font-semibold mb-6'>Sign Up</h1> 
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="text" placeholder='username'
       id='username'
        className="bg-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-200"
       onChange={handleChange}
       />
       {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username}</p>}
      <input type="email" placeholder='email'
       id='email'
        className="bg-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-200"
       onChange={handleChange}
       />
        {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
      <input type="password" placeholder='password'
       id='password'
        className="bg-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-200"
       onChange={handleChange} 
       />
       {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}

       <button disabled={loading} className='bg-white text-purple-600 px-4 py-2 text-sm font-semibold rounded-full  shadow-md 
            hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 '>
          {loading ? 'Loading' : 'Sign Up'}
          </button>
          <Oauth/>
    </form>
    <div className="flex gap-2 mt-5  justify-center text-white">
      <p> Have an account?</p>
      <Link to='/signin'>
      <span className='text-white underline'>Sign in</span>
      </Link>
    </div>
    <div>
      <p className='text-red-600 text-center mt-5'>{error && 'Somethimg went wrong!'}</p>
    </div>
    </div>
    </div>
  )
}

export default Signup;
