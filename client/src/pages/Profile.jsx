import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { 
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
   deleteUserStart,
   deleteUserFailure,
   deleteUserSuccess,
   signOut,
    } from '../redux/user/userSlice' 

const Profile = () => {
  const [image,setImage]=useState(undefined)

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('') 
  const fileRef = useRef(null)
  const {currentUser,error} = useSelector(state => state.user)
  const [updateSuccess,setUpdateSuccess] = useState(false)
  const [formData,setFormData] = useState({})
console.log('currrentuser:=',currentUser);

useEffect(()=>{
  if(image){
    handleFileUpload(image);
  }
},[image])

   const handleFileUpload = async (file) => {
     if(!file) return;

const presetKey = import.meta.env.VITE_CLOUDINARY_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const data = new FormData()
    data.append('file',file)
    data.append('upload_preset',presetKey)
    data.append('cloud_name',cloudName)

   
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
        method:'POST',
        body:data
      });
      const uploadImageURL = await res.json()
      console.log('upload data',uploadImageURL);
  
      if (!res.ok) {
        throw new Error(
          data.error?.message || "Upload failed. Please try again."
        );
      }
          // Update the image URL in state
      setImageUrl(uploadImageURL.secure_url)
   
    setLoading(false)      
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  console.log('infomations--',formData);
 
const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(updateUserStart());

  try {

    const updatedData = {
      ...formData,
      profilePicture: imageUrl || currentUser.profilePicture, // Use new image if uploaded
    };
    console.log("API URL:", `/api/user/update/${currentUser?._id}`);

    const res = await fetch(`/api/user/update/${currentUser?._id}`, {
      method: 'POST',
      // credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
       },
      body: JSON.stringify(updatedData),

    });
    console.log("Submitting update:", updatedData);
    console.log("Token:", currentUser?.token);
    console.log("API URL:", `/api/user/update/${currentUser?._id}`);


    const data = await res.json();

    if(data.success === false){
      dispatch(updateUserFailure(data))
      return;
    }
    
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true)
  } catch (error) {
    dispatch(updateUserFailure(error)); 
  }
};

const handleDeleteAccount =async() => {
  try {
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    })
    const data = await res.json();
    if(data.success===false){
      dispatch(deleteUserFailure(data))
      return;
    }
    dispatch(deleteUserSuccess(data))
  } catch (error) {
    dispatch(deleteUserFailure(error))

  }
}
const handleSignOut = async() =>{
  try {
    await fetch ('/api/auth/signout');
    dispatch(signOut())
  } catch (error) {
    console.log(error);
    
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])}/>
        <img src={imageUrl || currentUser.profilePicture} alt="Profile"
         className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
         onClick={() => fileRef.current.click()}/> 
        
        <input defaultValue={currentUser.username} type="text" id='username' placeholder='Username'
         className='bg-slate-100 rounded-lg p-3'
         onChange={handleChange}/>
        <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email'
         className='bg-slate-100 rounded-lg p-3'
         onChange={handleChange}/>
        <input type="password" id='password' placeholder='Password'
         className='bg-slate-100 rounded-lg p-3'
         onChange={handleChange}/>
         <button className='bg-purple-700 text-white p-3 rounded-lg uppercase 
          hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-600 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'user is updated successfully...'}</p>

    </div>
  )
}

export default Profile
