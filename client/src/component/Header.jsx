import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const {currentUser} = useSelector((state) => state.user)
  console.log("Current User Data:", currentUser);

  return (
    <div className='bg-purple-700 text-white'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li>Home</li>
            </Link>
            <Link to='/about'>
            <li>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=360'} 
               alt="profile" className='w-8 h-8 rounded-full object-cover' />
            ) : (
               <li>Sign In</li>
            ) }
           
            </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
