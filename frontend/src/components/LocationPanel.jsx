import React from "react";

const LocationPanel = ({
  suggestions,
  setpickup,
  setdropoff,
  activefield,
  vehiclepanel,
  setvehiclepanelopen,
  panelopen,
  setpanelopen,
}) => {


  //function to handle suggestion click
  const handlesuggestionclick = (elem) => {
    if (activefield === "pickup") {
      setpickup(elem.description);
    } else if (activefield === "dropoff") {
      setdropoff(elem.description);
    }
    // setpanelopen(false);
    // setvehiclepanelopen(true);
  };

  
  //sample data for location panel
  // const locationData = [
  //   {
  //     id: 1,
  //     location: "Shamshabad, Hyderabad, Telangana 500409, India",
  //   },
  //   {
  //     id: 2,
  //     location: "Abids, Hyderabad, Telangana 500409, India",
  //   },
  //   {
  //     id: 3,
  //     location: "LULU MALL, Hyderabad, Telangana 500409, India",
  //   },
  //   {
  //     id: 4,
  //     location: "Water park -- Wonderla, Hyderabad, Telangana 500409, India",
  //   },
  //   {
  //     id: 5,
  //     location: "Gachibola, Hyderabad, Telangana 500409, India",
  //   },
  // ];

  return (
    <div>
      {/* This is just a sample data */}
      {suggestions.map((elem, idx)=> {
        return (
          <div
            key={idx}
            onClick={() => {
              handlesuggestionclick(elem);
            }}
            className="flex ml-2 gap-2 mt-5  border-2 border-gray-100 rounded-lg active:border-black justify-center items-center my-5 w-[95%]"
          >
            
            <h2 className=" border rounded-full bg-[#eee] flex justify-center items-center h-10 w-10 ">
              <i className="ri-map-pin-2-fill text-2xl"></i>
            </h2>
            <h4 className="w-85 ml-2 text-xl">{elem.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationPanel;
