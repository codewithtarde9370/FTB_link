import React, { useState } from 'react'
import './login.css'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async () => {
    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password
      })
      if(response.data.success) {
        toast.success(response.data.message)
       
        localStorage.setItem('currentUser', JSON.stringify(response.data.data));
        toast.loading('Redirecting to dashboard...')
        setTimeout(()=>{
          window.location.href = '/'
        },3000)
      } 
      else {
        console.log(response.data.message)
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className='heading'>Login</h1>
      <form className='link-form'>
        <input
          type='email'
          placeholder='Email'
          className='user-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type='password' 
          placeholder='Password' 
          className='user-input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> 

        <button type='button' className='btn' onClick={loginNow}>Login</button>
      </form> 
      {/* button should always be giving type  */}

      <Link to='/signup' className='link'>Don't have an account? Sign up</Link>
      <Toaster />
    </div>
  )
}

export default Login
