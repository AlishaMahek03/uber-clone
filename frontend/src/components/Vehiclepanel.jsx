import React from "react";

const Vehiclepanel = ({
  setvehiclepanelopen,
  confirmvehiclepanel,
  setconfirmvehiclepanel,
  setselectVehicleType,
  fare,
}) => {
  return (
    <div>
      <h5
        onClick={() => {
          setvehiclepanelopen(false);
        }}
        className="absolute top-0 left-67"
      >
        <i className="ri-arrow-down-wide-line text-4xl text-gray-300 "></i>
      </h5>

      <h4 className="text-3xl p-3 font-medium">Choose a Ride!</h4>
      
      <div
        onClick={() => {
          setconfirmvehiclepanel(true),
          setselectVehicleType("car");
        }}
        className="border-2 border-[#eee] w-[90%] flex items-start justify-around ml-5  active:border-2 active:border-[#000000] rounded-lg  p-3"
      >
        <img
          className="h-20 w-20"
          src="https://static.vecteezy.com/system/resources/thumbnails/041/035/565/small_2x/white-car-isolated-on-white-background-vector.jpg"
          alt=""
        />
        <div className="ml-5  ">
          <h4 className="text-2xl font-medium">
            UberGo{" "}
            <span className="text-lg font-normal ml-3">
              <i className="ri-group-fill text-lg"></i>4
            </span>{" "}
          </h4>
          <h5>2 min away ..</h5>
          <p className="text-[#666262]">Affordable, compact rides</p>
        </div>
        <h2 className=" w-[2%] text-2xl flex "> ${fare.car}</h2>
      </div>
      <div
        onClick={() => {
          setconfirmvehiclepanel(true),
          setselectVehicleType("motorcycle");
        }}
        className="border-2 border-[#eee] w-[90%] flex items-start justify-around ml-5 mt-2  active:border-2 active:border-[#000000] rounded-lg  p-3"
      >
        <img
          className="h-20 w-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-5  ">
          <h4 className="text-2xl font-medium">
            Moto{" "}
            <span className="text-lg font-normal ml-3">
              <i className="ri-group-fill text-lg"></i>1
            </span>{" "}
          </h4>
          <h5>3 min away ..</h5>
          <p className="text-[#666262]">Affordable, motorcycle rides</p>
        </div>
        <h2 className="w-[2%] text-2xl">${fare.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          setconfirmvehiclepanel(true),
          setselectVehicleType("auto");
        }}
        className="mt-2 border-2 border-[#eee] w-[90%] flex items-start justify-around ml-5  active:border-2 active:border-[#000000] rounded-lg  p-3"
      >
        <img
          className="h-15 w-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="ml-5  ">
          <h4 className="text-2xl font-medium">
            Uber Auto{" "}
            <span className="text-lg font-normal ml-3">
              <i className="ri-group-fill text-lg"></i>4
            </span>{" "}
          </h4>
          <h5>1 min away ..</h5>
          <p className="text-[#666262]">Affordable, Auto rides</p>
        </div>
        <h2 className=" w-[2%] text-2xl">${fare.auto}</h2>
      </div>
      </div>
  );
};

export default Vehiclepanel;
