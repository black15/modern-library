import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const baseURL = "http://127.0.0.1:8000/api/v1"

function useAxios() {
  
  const {accessToken, setUser, setAccessToken} = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${accessToken.access}`}
  })

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(accessToken.access)
    const isExp = dayjs.unix(user.exp).diff(dayjs()) < 1
    
    if (!isExp) return req

    const response = await axios.post(`${baseURL}/token/refresh`, {
      refresh : accessToken.refresh
    })

    localStorage.setItem('authTokens', JSON.stringify(response.data))

    setAccessToken(response.data)
    setUser(jwt_decode(response.data.access))
    
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req      
  })

  return axiosInstance;
}

export default useAxios