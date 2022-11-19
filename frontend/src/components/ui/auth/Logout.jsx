import React, {useContext} from 'react'
import { useEffect } from 'react'
import AuthContext from '../../../context/AuthContext'


function Logout() {

  const auth = useContext(AuthContext)
  useEffect(() => {
    auth.logout()
  })
  
  return (
    <div>
      Logged Out !
    </div>
  )
}

export default Logout