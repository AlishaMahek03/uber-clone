import React from 'react'
import { useState , useEffect} from 'react';

const LookingforDriver = ({setlookingfordriver, pickup, dropoff}) => {
  
  return (
    <div className="relative">
      <h5 onClick={()=>{setlookingfordriver(false)}} className="absolute top-3 right-0">
        <i className="ri-arrow-down-wide-line text-4xl text-gray-300 "></i>
      </h5>
      <img
        className="h-40 w-40 absolute left-40 top-10 "
        src="https://static.vecteezy.com/system/resources/thumbnails/041/035/565/small_2x/white-car-isolated-on-white-background-vector.jpg"
        alt=""
      />
      <h4 className="text-3xl mt-0 p-2 font-medium">Looking for nearby captains!</h4>
      <div className="line h-19 absolute top-60 z-30 left-9 rounded-full w-1 bg-gray-700"></div>
      <div className="absolute top-50 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center p-1 my-5 w-[95%] bg-blue-100">
        <h2 className=" ml-2 border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
          <i className=" ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">
           {pickup}
        </h4>
      </div>

      <div className="absolute top-70 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center my-5 w-[95%] p-1 bg-blue-100">
        <h2 className="ml-2 border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
        <i className="ri-map-pin-2-fill  text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">
          {dropoff}
        </h4>
      </div>

      
      

    </div>
  )
}

export default LookingforDriver
