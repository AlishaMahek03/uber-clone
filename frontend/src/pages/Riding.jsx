import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useEffect , useContext} from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(rideData)
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRideEnded = () => {
      navigate('/home');
    };
    socket.on('ride-ended', handleRideEnded);
    return () => socket.off('ride-ended', handleRideEnded);
  }, [socket, navigate]);
  return (
    <div className="h-screen">
        <Link to={
            "/home"
        } className="fixed h-12 w-12 bg-white flex items-center justify-center rounded-full">
            <i className="ri-home-4-fill text-xl font-medium"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking/>
      </div>
      <div className="h-1/2 flex flex-col justify-center items-center relative">
      <img
        className="h-45 w-65 absolute left-0  top-0"
        src="https://static.vecteezy.com/system/resources/thumbnails/041/035/565/small_2x/white-car-isolated-on-white-background-vector.jpg"
        alt=""
      />
        <h2 className="absolute top-2 right-10 text-2xl text-gray-500">
          {rideData?.captainId.fullname.firstname + " "+ rideData?.captainId.fullname.lastname}
        </h2>

        <h3 className="absolute top-12 right-10 text-2xl font-bold ">
          {rideData?.captainId.vehicle.plate}
        </h3>

        <p className=" absolute top-20 right-10 text-2xl text-gray-500">
          {rideData?.captainId.vehicle.color + " "+ rideData?.captainId.vehicle.vehicletypes}
        </p>

        <p className="absolute right-10 top-32 text-xl text-gray-500">★ 4.9</p>

        <div className="line bg-black h-20 w-1 absolute top-57 border rounded-lg left-14 z-10"></div>
        <div className="absolute top-50 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center p-1 my-3 w-[95%] bg-blue-100">
        
        <h4 className="w-full ml-20 text-xl font-bold">
           {rideData?.pickup}
        </h4>
      </div>

      <div className="absolute top-70 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center my-3 w-[95%] p-1 bg-blue-100">
        
        <h4 className="w-full ml-20 text-xl font-bold">
           {rideData?.dropoff}
        </h4>
      </div>
      <div className="flex  items-center justify-start w-full">
      <button className="ml-2 mb-4 w-50 absolute top-99 border border-[#eee] shadow-lg bg-yellow-500  text-black font-bold text-xl px-5 py-2">${rideData?.fare}</button>
      <button className="ml-55 mb-4 w-50 absolute top-99  border border-[#eee] shadow-lg bg-green-700 font-semibold text-white text-xl px-5 py-2">Make a payment</button>
      </div>
        
      </div>
    </div>
  );
};

export default Riding;
