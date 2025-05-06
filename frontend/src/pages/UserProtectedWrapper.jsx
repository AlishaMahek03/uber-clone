import React from 'react'
import { useEffect } from 'react';
import { userdatacontext } from "../context/Userdata";
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if(!token) {
        navigate('/login');
      }
    }, [token])
    
    
  return (
    <div>
       {children}
    </div>
  )
}

export default UserProtectedWrapper
