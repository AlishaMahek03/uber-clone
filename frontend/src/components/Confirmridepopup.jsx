import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Confirmridepopup = ({ setconfirmride, setRidePopup, ride }) => {
  if (!ride || !ride.userId || !ride.userId.fullname) {
    return <div>Loading...</div>;
  }
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: { rideId: ride._id, otp: otp },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      setconfirmride(false);
      navigate("/captain/riding", {state: {ride:ride}});
    }
    // Handle OTP submission logic here
    console.log("OTP submitted:", otp);
    // Navigate to another route after submission
  };
  return (
    <div className="relative h-screen w-screen">
      <h5
        onClick={() => {
          setconfirmride(false), setRidePopup(false);
        }}
        className="absolute top-0 left-0"
      >
        <i className="ri-close-circle-fill text-4xl text-gray-300 "></i>
      </h5>
      <div className="h-175 w-[95%] bg-[#f3efef] mt-18  border rounded-lg shadow-lg">
        <div className="profile flex gap-5">
          <img
            src="https://rlv.zcache.ca/anime_girl_christmas_lights_square_sticker-r082a2d1a73944cc29eb60b7128e19b34_0ugmc_8byvr_200.webp"
            alt=""
            className="h-25 p-2 "
          />
          <div className="flex justify-between w-full items-center">
            <h2 className="text-2xl p-2 font-medium">
              {ride.userId.fullname.firstname +
                " " +
                ride.userId.fullname.lastname}
            </h2>
            <p className="text-xl p-3">${ride.fare}</p>
          </div>
        </div>
        <hr />
        <div className="pickup mb-10 h-12 w-full mt-5 ml-5">
          <h2 className="text-gray-600">Pickup:</h2>
          <h3 className="ml-2 text-xl font-medium">{ride.pickup}</h3>
        </div>
        <hr />
        <div className="destination m-10 mb-20  h-12 w-full mt-5 ml-5">
          <h2 className="text-gray-600">Drop off:</h2>
          <h3 className="ml-2 text-xl font-medium">{ride.dropoff}</h3>
        </div>
        <hr />
        <div className="flex  flex-col justify-between mt-8 px-4">
          <h4 className="text-gray-600">Trip Fare</h4>
          <div className="flex justify-between mt-1 px-4">
            <p>Apple pay : </p>
            <p>${ride.fare + 10}</p>
          </div>
          <div className="flex justify-between mt-1 px-4">
            <p>Discount: </p>
            <p>$10.00</p>
          </div>
          <div className="flex justify-between mt-1 px-4 ">
            <p>Paid Amount : </p>
            <p>${ride.fare}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 px-4 py-3 ml-2">
          <input
            value={otp}
            onChange={handleChange}
            type="text"
            className="text-start ml-5 font-mono w-[90%] bg-gray-200 p-5"
            placeholder="Enter OTP"
          />
          <div className="button mt-6  flex justify-center items-center text-center">
            <button
              to={"/captain/riding"}
              type="submit"
              className="w-[70%] border py-4 bg-yellow-500 text-xl font-semibold"
            >
              Confirm Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Confirmridepopup;
