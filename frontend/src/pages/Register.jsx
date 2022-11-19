// eslint-disable-next-line
import React, {useContext, useEffect, useState} from 'react'
import RegisterForm from '../components/ui/auth/RegisterForm'
import AuthContext from '../context/AuthContext'


function Register() {
  const auth = useContext(AuthContext)

  return (
    <div className='font-noto'>
      <RegisterForm register={auth.register} errors={auth.errors} />
    </div>
  )
}

export default Register