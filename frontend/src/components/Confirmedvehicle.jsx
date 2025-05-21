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
        className="h-40 w-40 absolute left-25 top-10 "
        src="https://static.vecteezy.com/system/resources/thumbnails/041/035/565/small_2x/white-car-isolated-on-white-background-vector.jpg"
        alt=""
      />
      <div className="flex items-center">
        <h2 className="absolute top-13 flex ml-120 gap-2 mt-10 text-3xl">Fare:</h2>
        <div className="absolute top-10 flex ml-140 gap-2 mt-10  border-2 border-gray-100  active:border-black justify-center items-center p-3 w-[25%] bg-yellow-500 text-2xl font-bold">
        ${confirmfare}
      </div>
      </div>
      <h4 className="text-3xl p-3 font-medium">Confirm your Ride!</h4>
      <div className="line h-19 absolute top-60 z-30 left-9 rounded-full w-1 bg-gray-700"></div>
      <div className="absolute top-50 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center p-1 my-5 w-[95%] bg-blue-100">
        <h2 className="ml-2 border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
          <i className="ri-square-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">{pickup}</h4>
      </div>

      <div className="absolute top-70 flex ml-2 gap-2 mt-0  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center my-5 w-[95%] p-1 bg-blue-100">
        <h2 className="ml-2 border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
          <i className=" ri-map-pin-2-fill text-2xl"></i>
        </h2>
        <h4 className="w-85 ml-2 text-xl">{dropoff}</h4>
      </div>

      

      <div className="absolute top-103 flex  gap-2  border-2 border-gray-100 active:border-black rounded-xl justify-center items-center w-full bg-green-700">
        <button
          onClick={() => {
            setlookingfordriver(true);
            createRide(selectvehicleType);
            setconfirmvehiclepanel(false);
            setvehiclepanelopen(false);
          }}
          className="p-5  text-white font-bold text-2xl"
        >
          Confirm your ride
        </button>
      </div>
    </div>
  );
};

export default Confirmedvehicle;
