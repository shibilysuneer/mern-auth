import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-purple-600'>
      Welcome {currentUser ? currentUser.username : ''}</h1>
      <p className='mb-4 text-slate-700'>This is a full-stack web application built with the MERN (Mongodb,Express,React,Node.js) stack.
        It include authentication features that allow users to sign up, log in, log out , and provides access 
        to protected routes for authenticated users.
      </p>
      <p className='mb-4 text-slate-700'>The front-end of the application is built with React and users React Router for client side 
        routing. The back-end is built with Node.js and Express,and uses Mongodb as the database 
        .Authentication is impliment using JSON WAebToken(JWT).
      </p>
      <p className='mb-4 text-slate-700'>The application is intended as a starting point for building full-stack web application with
         authentication using the MERN stack.Feel free to use it as a template for your own projects!.
      </p>
    </div>
  )
}

export default Home
