import React, { createContext, useState, useEffect } from 'react'


export const userdatacontext = createContext();

const Userdata = ({children}) => {
    const [user, setuser] = useState({
        email:"",
        fullname:{
            firstname:"",
            lastname:""
        }
    })

     useEffect(() => {
    // Load user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setuser(storedUser); // Rehydrate user state
    }
  }, []);
  return (
    <div>
        <userdatacontext.Provider value={{user, setuser}}>
            {children}
        </userdatacontext.Provider>
      
    </div>
  )
}

export default Userdata
