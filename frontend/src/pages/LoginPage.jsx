import React from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate()

  const LoginHandler = async () => {
    const response = window.location.href = "http://localhost:3000/api/user/login";
    if(response.success == true){
      navigate('http://localhost:5173/')
    }
  }

  return (
    <div className='loginmain w-[100vw] h-[100vh] '>
      <div>
        <h2>Welcome to the LOGIN page</h2>
        <h1>Login to our app <b>TEST CODE</b></h1>

        <button onClick={LoginHandler}>Login</button>
      </div>
    </div>
  )
}

export default LoginPage