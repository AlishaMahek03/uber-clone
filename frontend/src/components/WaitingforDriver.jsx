import React from 'react'

const WaitingforDriver = ({setwaitingfordriver, ride}) => {
  return (
    <div className="relative">

      <div onClick={()=>{setwaitingfordriver(false)}} className='h-1 w-15 left-60 absolute top-0 bg-gray-300'></div>

      <h1 className='text-2xl absolute top-6 font-semibold'>Meet at the pickup point</h1>

      <div className='absolute top-0 right-0 h-20 w-15 bg-black'>
        <h3 className='time text-white font-bold text-2xl text-center mt-4'>2</h3>
        <p className='text-white text-center'>min</p>

      </div>

    <img className='h-30 w-30 absolute z-10 top-30 rounded-full bg-center' src="https://a.storyblok.com/f/284380/b12e9904d8/five-star-uber-driver.jpg" alt="" />
    <img
      className="h-40 w-40 absolute left-23  top-25 "
      src="https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.jpg?s=612x612&w=0&k=20&c=MkM3U9ruXp2wKCgYKeL6DyZ9H5WFIHtyRWsbOMokrFg="
      alt=""
    />

    
    <h1 className='absolute right-0 top-25 font-bold text-2xl text-black capitalize'>OTP: {ride?.otp}</h1>
    <h2 className='absolute right-0 top-35 text-xl text-gray-500 capitalize'>{ride?.captainId.fullname.firstname +" "+ ride?.captainId.fullname.lastname}</h2>

    <h3 className='text-xl font-bold absolute right-0 top-42'>{ride?.captainId.vehicle.plate}</h3>

    <p className='absolute right-0 top-50 text-xl text-gray-500'>{ride?.captainId.vehicle.color + " "+ ride?.captainId.vehicle.vehicletypes}</p>

    <p className='absolute right-0 top-57 text-xl text-gray-500'>★ 4.9</p>
    

    <h2 className='absolute top-76 font-medium text-2xl text-black'>Location for Pickup & Dropoff :</h2>
    
    <div className="absolute top-90 flex flex-col  gap-5 mt-0   rounded-lg  justify-start items-center  w-[95%] p-1 ">
        <div className='flex justify-start  items-center'>
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
        <i className="ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-full ml-2 text-xl">
           {ride?.pickup}
        </h4>
        </div>
         <div className='flex justify-start ml-8  items-center'>
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
        <i className="ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-full ml-2 text-xl">
           {ride?.dropoff}
        </h4>
        </div>
      </div>
    </div>

  )
}

export default WaitingforDriver
