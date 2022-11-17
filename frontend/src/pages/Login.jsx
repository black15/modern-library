// eslint-disable-next-line
import React, {useContext, useEffect, useState} from 'react'
import LoginForm from '../components/ui/auth/LoginForm'
import AuthContext from '../context/AuthContext'


function Login() {
  const auth = useContext(AuthContext)

  return (
    <div className='font-noto'>
      <LoginForm login={auth.login} errors={auth.errors}/>
    </div>
  )
}

export default Login