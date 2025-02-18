import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'

const Profile = () => {

  const [loading,setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('') 
  // const dispatch = useDispatch();
  const fileRef = useRef(null)
  const {currentUser} = useSelector(state => state.user)

  const handleFileUpload = async (event) => {
    const file =  event.target.files[0]
    if(!file) return;

  setLoading(true)

    const data = new FormData()
    data.append('file',file)
    data.append('upload_preset','first_time_use_cloudinary')
    data.append('cloud_name','dpidgluon')

   
      const res = await fetch('https://api.cloudinary.com/v1_1/dpidgluon/image/upload',{
        method:'POST',
        body:data
      });
      const uploadImageURL = await res.json()
      console.log(uploadImageURL);
  
          // Update the image URL in state
      setImageUrl(uploadImageURL.secure_url)
   
    setLoading(false)
          
  }
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={handleFileUpload}/>
        <img src={imageUrl || currentUser.profilePicture} alt="Profile"
         className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
         onClick={() => fileRef.current.click()}/> 
        
        <input defaultValue={currentUser.username} type="text" id='username' placeholder='Username'
         className='bg-slate-100 rounded-lg p-3'/>
        <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email'
         className='bg-slate-100 rounded-lg p-3'/>
        <input type="password" id='password' placeholder='Password'
         className='bg-slate-100 rounded-lg p-3'/>
         <button className='bg-cyan-600 text-white p-3 rounded-lg uppercase 
          hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
