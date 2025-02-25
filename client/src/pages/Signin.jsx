import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import { validateEmail,validatePassword } from '../../validation'
import Oauth from '../component/Oauth'

const Signin = () => {

  const [formData,setFormData] = useState({})
  const [validationErrors, setValidationErrors] = useState({});
  const {loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    let errors = {};
    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 4 characters, include a number & special character";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      dispatch(signInStart())
      
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
     
      if(data.success===false){
        
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error))
    }
  }

  return (
  <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
    <div className="bg-white/10 border border-gray-300 backdrop-blur-lg  rounded-lg p-8 shadow-lg max-w-md w-full">
      <h1 className='text-3xl text-center text-white font-semibold mb-6'>Sign In</h1> 
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     
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
          {loading ? 'Loading' : 'Sign In'}
          </button>
          <Oauth/>
    </form>
    <div className="flex gap-2 mt-5  justify-center text-white">
      <p>Dont Have an account?</p>
      <Link to='/signup'>
      <span className='text-white underline'>Sign up</span>
      </Link>
    </div>
    <div>
      <p className='text-red-600 text-center mt-5'>
        {error ? error.message || 'Somethimg went wrong!': ''}</p>
    </div>
    </div>
    </div>
  )
}


export default Signin;
