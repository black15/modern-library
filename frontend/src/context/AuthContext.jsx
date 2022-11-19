import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  
  const [accessToken, setAccessToken] = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  )
  const [user, setUser] = useState(() => 
    localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
  )
  const [errors, setErrors] = useState(null)

  const redirect = useNavigate()
  
  const login = async (data) => {
    axios.post('http://127.0.0.1:8000/api/v1/token/', data
    )
      .then(res => {
        if (res.status === 200) {
          setAccessToken(res.data)
          setUser(jwt_decode(res.data.access))
          localStorage.setItem('authTokens', JSON.stringify(res.data))
          redirect('/')
        }
      })
      .catch(err => {
        console.log(err.response.data);
        setErrors({error: err.response.data});
      })
  }

  const register = (data) => {
    axios.post('http://127.0.0.1:8000/api/v1/register/', data)
      .then(res => {
        redirect('/login')
      })
      .catch(err => {
        console.log('ERror Func Register', err);
      })
  }

  const logout = () => {
    localStorage.removeItem('authTokens')
    setAccessToken(null)
    setUser(null)
    redirect('/')
  }

  const context = {
    user: user,
    accessToken: accessToken,
    login: login,
    register: register,
    logout: logout,
    errors: errors
  }

  useEffect(() => {accessToken && setUser(jwt_decode(accessToken.access))}, [accessToken])
    return (
      <AuthContext.Provider value={context}>
        {children}
      </AuthContext.Provider>
    )
}

export default AuthContext
