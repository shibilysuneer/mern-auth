import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AdminSignIn from './pages/AdminSignIn'
import Dashboard from './pages/Dashboard'
import Header from './component/Header'
import PrivateRoute from './component/PrivateRoute'
import AdminPrivateRoute from './component/AdminPrivateRoute'
import UserDetailView from './pages/UserDetailView'

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
    <Route path='/admin/signin' element={<AdminSignIn/>} />
    <Route element={<AdminPrivateRoute/>}>
    <Route path='/admin/dashboard' element={<Dashboard/>} />
    <Route path='/admin/dashboard/user/:id' element={<UserDetailView/>} />
    </Route>
   
   </Routes>
   </BrowserRouter>
    
  )
}

export default App
