import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {

  const [formData,setFormData] = useState({})
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // setError(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
    // console.log(data);  
  }

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-4xl text-center font-semibold my-7'>Sign Up</h1> 
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="text" placeholder='username'
       id='username' className='bg-slate-100 p-3 rounded-lg'
       onChange={handleChange}
       />
      <input type="email" placeholder='email'
       id='email' className='bg-slate-100 p-3 rounded-lg' 
       onChange={handleChange}
       />
      <input type="password" placeholder='password'
       id='password' className='bg-slate-100 p-3 rounded-lg'
       onChange={handleChange} 
       />
       <button disabled={loading} className='bg-cyan-800 text-white p-2 rounded-lg
        uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading' : 'Sign Up'}
          </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p> Have an account?</p>
      <Link to='/signin'>
      <span className='text-blue-600'>Sign in</span>
      </Link>
    </div>
    <div>
      <p className='text-red-600 mt-5'>{error && 'Somethimg went wrong!'}</p>
    </div>
    </div>
  )
}

export default Signup
