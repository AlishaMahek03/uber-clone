import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1711497365127-118ffafe48a5?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-screen  flex flex-col justify-between w-screen '>
            <img className='w-75 pt-2 pl-1' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
            <div className='flex pl-5 pt-5 h-50 gap-9 flex-col   bg-white shadow-lg'>
                <h2 className='font-bold text-4xl'>Get Started with Uber!</h2>
                <Link to='/login' className='flex items-center justify-center bg-black px-5 py-3 text-white font-medium text-2xl w-[90%] border rounded-3xl relative'>Continue <span className='absolute right-10'>→</span> </Link>
            </div>
        </div>
    </div>
  )
}

export default Start
