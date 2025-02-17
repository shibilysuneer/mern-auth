import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Signin = () => {

  const [formData,setFormData] = useState({})
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log("API Response:", data); 

      setLoading(false)
      if(data.success===false){
        setError(true);
        return;
      }
      navigate('/');
    } catch (error) {
      setLoading(false)
      setError(true)
    }
    // console.log(data);      bg-cover bg-center
  }

  return (
  <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
    <div className="bg-white/10 border border-gray-300 backdrop-blur-lg  rounded-lg p-8 shadow-lg max-w-md w-full">
    {/* // <div className='p-3 max-w-lg mx-auto' > */}
      <h1 className='text-3xl text-center text-white font-semibold mb-6'>Sign In</h1> 
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     
      <input type="email" placeholder='email'
       id='email'
        // className='bg-slate-100 p-3 rounded-lg' 
        className="bg-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-200"
       onChange={handleChange}
       />
      <input type="password" placeholder='password'
       id='password'
        // className='bg-slate-100 p-3 rounded-lg'
        className="bg-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-200"
       onChange={handleChange} 
       />
       <button disabled={loading} className='bg-white text-purple-600 px-4 py-2 text-sm font-semibold rounded-full  shadow-md 
            hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 '>
          {loading ? 'Loading' : 'Sign In'}
          </button>
    </form>
    {/* <div className='flex gap-2 mt-5'> */}
    <div className="flex gap-2 mt-5  justify-center text-white">
      <p>Dont Have an account?</p>
      <Link to='/signup'>
      <span className='text-blue-600 hover:underline'>Sign up</span>
      </Link>
    </div>
    <div>
      <p className='text-red-600 text-center mt-5'>{error && 'Somethimg went wrong!'}</p>
    </div>
    </div>
    </div>
  )
}


export default Signin;
