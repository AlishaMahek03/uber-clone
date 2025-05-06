import React from 'react'

const WaitingforDriver = ({setwaitingfordriver}) => {
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

    <h2 className='absolute right-0 top-35 text-xl text-gray-500'>Santosh</h2>

    <h3 className='text-2xl font-bold absolute right-0 top-42'>KA15AK00-00</h3>

    <p className='absolute right-0 top-50 text-xl text-gray-500'>White Suzuki S-Presso LXI </p>

    <p className='absolute right-0 top-57 text-xl text-gray-500'>★ 4.9</p>
    

    <h2 className='absolute top-76 font-medium text-2xl text-black'>Location for Pickup :</h2>
    
    <div className="absolute top-90 flex ml-2 gap-2 mt-0   rounded-lg  justify-center items-center my-5 w-[95%] p-1 ">
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
        <i className="ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">
           Shamshabad, Hyderabad, Telangana 500409, India
        </h4>
      </div>
    </div>
  )
}

export default WaitingforDriver
