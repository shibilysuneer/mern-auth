import React from 'react'
import google from '../assets/google.png'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'

const Oauth = () => {
    const dispatch = useDispatch();
    const handleGoogle =async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
        } catch (error) {
            console.log('not to google',error);
            
        }
    }
      return (
    <div className='flex border mt-4 p-2 cursor-pointer'>
        <img src={google} className='w-6 h-6' />
        <button type='button' onClick={handleGoogle} className='font-semibold ml-12 text-white'>Continue with Google</button>
    </div>
  )
}

export default Oauth
