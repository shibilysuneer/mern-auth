import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './component/Header'
import PrivateRoute from './component/PrivateRoute'

const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/signin' element={<Signin/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>} />
    </Route>

   
   </Routes>
   </BrowserRouter>
    
  )
}

export default App
