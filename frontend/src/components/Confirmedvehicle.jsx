import React, { useState, useEffect } from "react";

const Confirmedvehicle = ({
  setconfirmvehiclepanel,
  setlookingfordriver,
  createRide,
  pickup,
  dropoff,
  fare,
  selectvehicleType,
  setvehiclepanelopen
}) => {
  const [confirmfare, setconfirmfare] = useState(fare["car"]); // Default to car fare

  // Update confirmfare when selectvehicleType changes
  useEffect(() => {
    if (selectvehicleType === "car") {
      setconfirmfare(fare["car"]);
    } else if (selectvehicleType === "auto") {
      setconfirmfare(fare["auto"]);
    } else {
      setconfirmfare(fare["motorcycle"]); // Default to car fare
    }
  }, [selectvehicleType, fare]);

  return (
    <div className="relative ">
      <h5
        onClick={() => {
          setconfirmvehiclepanel(false);
        }}
        className="absolute top-3 right-0"
      >
        <i className="ri-arrow-down-wide-line text-4xl text-gray-300 "></i>
      </h5>
      <img
        className="h-40 w-40 absolute left-40 top-10 "
        src="https://static.vecteezy.com/system/resources/thumbnails/041/035/565/small_2x/white-car-isolated-on-white-background-vector.jpg"
        alt=""
      />
      <h4 className="text-3xl p-3 font-medium">Confirm your Ride!</h4>
      <div className="line h-19 absolute top-60 z-30 left-7 rounded-full w-1 bg-gray-700"></div>
      <div className="absolute top-50 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center p-1 my-5 w-[95%] bg-blue-100">
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
          <i className="ri-map-pin-2-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">{pickup}</h4>
      </div>

      <div className="absolute top-70 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center my-5 w-[95%] p-1 bg-blue-100">
        <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
          <i className="ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">{dropoff}</h4>
      </div>

      <div className="absolute top-90 flex ml-50 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center p-1 w-[25%] bg-red-300 text-xl">
        ${confirmfare}
      </div>

      <div className="absolute top-104 flex ml-20 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center w-[75%] bg-green-700">
        <button
          onClick={() => {
            setlookingfordriver(true);
            createRide(selectvehicleType);
            setconfirmvehiclepanel(false);
            setvehiclepanelopen(false);
          }}
          className="p-5 mt-0 text-white font-bold text-xl"
        >
          Confirm your ride
        </button>
      </div>
    </div>
  );
};

export default Confirmedvehicle;
