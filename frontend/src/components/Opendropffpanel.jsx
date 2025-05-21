import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Opendropffpanel = ({ setOpendropoffpanel, rideData }) => {
  const navigate = useNavigate();
   async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: rideData._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

  return (
    <div className="relative h-screen w-screen">
      <h5
        onClick={() => {
          setOpendropoffpanel(false);
        }}
        className="absolute top-0 left-0"
      >
        <i className="ri-close-circle-fill text-4xl text-gray-300 "></i>
      </h5>
      <div className="h-160 w-[95%] bg-[#f3efef] mt-15  border rounded-lg shadow-lg">
        <div className="profile flex gap-5">
          <img
            src="https://rlv.zcache.ca/anime_girl_christmas_lights_square_sticker-r082a2d1a73944cc29eb60b7128e19b34_0ugmc_8byvr_200.webp"
            alt=""
            className="h-25 p-2 "
          />
          <div className="flex justify-between w-full items-center">
            <h2 className="text-2xl p-2 font-medium">{rideData?.userId.fullname.firstname+" "+rideData?.userId.fullname.lastname}</h2>
            <p className="text-xl p-3">${rideData?.fare}</p>
          </div>
        </div>
        <hr />
        <div className="pickup mb-10 m-5 h-12 w-[90%] mt-5 ml-5">
          <h2 className="text-gray-600">Pickup:</h2>
          <h3 className="ml-2 text-xl font-medium">{rideData?.pickup}</h3>
        </div>
        <hr />
        <div className="destination mb-20 m-5 h-12 w-[90%] mt-5 ml-5">
          <h2 className="text-gray-600">Drop off:</h2>
          <h3 className="ml-2 text-xl font-medium">{rideData?.dropoff}</h3>
        </div>
        <hr />
        <div className="flex m-5 flex-col justify-between mt-5 px-4">
          <h4 className="text-gray-600">Trip Fare</h4>
          <div className="flex justify-between mt-1 px-4">
            <p>Apple pay :</p>
            <p>${rideData?.fare+10}</p>
          </div>
          <div className="flex justify-between mt-1 px-4">
            <p>Discount:</p>
            <p>$10.00</p>
          </div>
          <div className="flex justify-between mt-1 px-4 ">
            <p>Paid Amount :</p>
            <p>${rideData?.fare}</p>
          </div>
        </div>
        <hr />

        <div className="button mt-10  flex justify-center items-center text-center">
            <button

            onClick={endRide}
              
              className="w-[70%] border py-4 bg-yellow-500 text-xl font-semibold"
            >
              Finish Ride!
            </button>
          </div>

        
      </div>
    </div>
  );
};

export default Opendropffpanel;