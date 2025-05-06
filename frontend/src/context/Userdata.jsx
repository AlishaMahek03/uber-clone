import React, { createContext, useState } from 'react'


export const userdatacontext = createContext();

const Userdata = ({children}) => {
    const [user, setuser] = useState({
        email:"",
        fullname:{
            firstname:"",
            lastname:""
        },
        password:"",
    })
  return (
    <div>
        <userdatacontext.Provider value={[user, setuser]}>
            {children}
        </userdatacontext.Provider>
      
    </div>
  )
}

export default Userdata
