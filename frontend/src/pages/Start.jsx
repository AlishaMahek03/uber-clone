import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1557404763-69708cd8b9ce?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww")] h-screen  flex flex-col justify-between w-screen '>
            <img className='w-65' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
            <div className='flex pl-5 pt-5 h-50 gap-9 flex-col   bg-white shadow-lg'>
                <h2 className='font-bold text-4xl'>Get Started with Uber!</h2>
                <Link to='/login' className='flex items-center justify-center bg-black px-15 py-3 text-white font-medium text-2xl w-[65%] ml-20 border rounded-xl relative'>Continue <span className='absolute right-10'>→</span> </Link>
            </div>
        </div>
    </div>
  )
}

export default Start
