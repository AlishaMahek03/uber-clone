import React from "react";

const Ridepopup = ({setRidePopup, setconfirmride, ride, confirmridefunction}) => {
  return (
    <div>
      <div className="relative">
        <h5 onClick={()=>{setRidePopup(false)}} className="absolute top-3 right-0">
          <i className="ri-arrow-down-wide-line text-4xl text-gray-300 "></i>
        </h5>

        <h4 className="text-3xl p-3 font-medium">
          New Ride Available for you!
        </h4>

        <div className="h-90 w-[80%] bg-[#f3efef] mt-8 ml-10 border rounded-lg shadow-lg">
            <div className="profile flex gap-5">
                <img src="https://rlv.zcache.ca/anime_girl_christmas_lights_square_sticker-r082a2d1a73944cc29eb60b7128e19b34_0ugmc_8byvr_200.webp" alt=""  className="h-25 p-2 "/>
                <div className="flex justify-between w-[70%] items-center">
                    <h2 className="text-2xl p-2 font-medium">{ride?.userId.fullname.firstname + " "+ ride?.userId.fullname.lastname} </h2>
                    <p className="text-xl p-3">${ride?.fare}</p>
                </div>
            </div>
            <hr />
            <div className="pickup m-5  h-12 w-[90%] mt-5 ml-5">
                <h2 className="text-gray-600">Pickup:</h2>
                <h3 className="ml-2 text-xl font-medium">{ride?.pickup}  </h3>
            </div>
            <hr />
            <div className="destination  h-12 w-[90%] mt-5 ml-5">
                <h2 className="text-gray-600">Drop off:</h2>
                <h3 className="ml-2 text-xl font-medium">{ride?.dropoff}</h3>
            </div>

            <div className="buttona h-12 w-[90%] mt-5 ml-5 flex items-center">
                <button onClick={()=>{setRidePopup(false)}} className="m-2 p-2 text-gray-400 ml-50 ">Ignore</button>
                <button onClick={()=>{setconfirmride(true), confirmridefunction()}}  className="ml-5 bg-yellow-500 p-2 w-1/2 rounded-lg font-bold">Accept</button>
            </div>
        </div>


    </div>
    </div>
  );
};

export default Ridepopup;
