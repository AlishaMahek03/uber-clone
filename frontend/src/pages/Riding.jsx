import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useEffect , useContext} from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
const Riding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(rideData)
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-ended',()=> {
    navigate('/home');
  })

  return (
    <div className="h-screen">
        <Link to={
            "/home"
        } className="fixed h-12 w-12 bg-white flex items-center justify-center rounded-full">
            <i className="ri-home-4-fill text-xl font-medium"></i>
        </Link>
      <div className="h-1/2">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-1/2 flex flex-col justify-center items-center relative">
      <img
        className="h-45 w-65 absolute left-0  top-0"
        src="https://static.vecteezy.com/system/resources/thumbnails/041/035/565/small_2x/white-car-isolated-on-white-background-vector.jpg"
        alt=""
      />
        <h2 className="absolute top-2 right-3 text-xl text-gray-500">
          {rideData?.captainId.fullname.firstname + " "+ rideData?.captainId.fullname.lastname};
        </h2>

        <h3 className="absolute top-9 right-3 text-2xl font-bold ">
          {rideData?.captainId.vehicle.plate}
        </h3>

        <p className=" absolute top-18 right-3 text-xl text-gray-500">
          {rideData?.captainId.vehicle.color + " "+ rideData?.captainId.vehicle.vehicletypes}
        </p>

        <p className="absolute right-3 top-29 text-xl text-gray-500">★ 4.9</p>


        <div className="absolute top-50 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center p-1 my-5 w-[95%] bg-blue-100">
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
          <i className="ri-map-pin-2-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">
           {rideData?.pickup}
        </h4>
      </div>

      <div className="absolute top-70 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center my-5 w-[95%] p-1 bg-blue-100">
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
        <i className="ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">
           {rideData?.dropoff}
        </h4>
      </div>
      <div className="flex  items-center">
      <button className=" w-50 absolute top-92 left-10 border border-[#eee] shadow-lg bg-red-400 font-semibold text-white text-xl px-5 py-2">${rideData?.fare}</button>
      <button className=" w-50 absolute top-92  border border-[#eee] shadow-lg bg-green-400 font-semibold text-white text-xl px-5 py-2">Make a payment</button>
      </div>
        
      </div>
    </div>
  );
};

export default Riding;
