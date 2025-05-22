import React, { useRef, useState, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import gsap from "gsap";
import LocationPanel from "../components/LocationPanel";
import Vehiclepanel from "../components/Vehiclepanel";
import Confirmedvehicle from "../components/Confirmedvehicle";
import LookingforDriver from "../components/LookingforDriver";
import WaitingforDriver from "../components/WaitingforDriver";
import { SocketContext } from '../context/SocketContext';
import { userdatacontext } from "../context/Userdata";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import transitlylogo from '/transitly_logo.svg'
const Home = () => {
  const [pickup, setpickup] = useState("");
  const [dropoff, setdropoff] = useState("");
  //For opening the first panel
  const [panelopen, setpanelopen] = useState(false);
  const panelRef = useRef(null);
  //For opening the second panel
  const [vehiclepanelopen, setvehiclepanelopen] = useState(false);
  const vehiclepanelref = useRef(null);
  //For opening the third panel
  const [confirmvehiclepanel, setconfirmvehiclepanel] = useState(false);
  const confirvehicleref = useRef(null);
  //For opening the fourth panel
  const [lookingfordriver, setlookingfordriver] = useState(false);
  const lookingfordriverref = useRef(null);

  //For opening the fifth panel
  const [waitingfordriver, setwaitingfordriver] = useState(false);
  const waitingfordriverref = useRef(null);

  //for first panel suggestions for pickup
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [activefield, setActiveField] = useState(null);

  //ride panel
  const [ride, setride] = useState(null);

  //shwoing the vehicle panel fare
  const [fare, setFare] = useState({});

  //updating the vehicle type
  const [selectvehicleType, setselectVehicleType] = useState("");

  const navigate = useNavigate();


  const { socket } = useContext(SocketContext);
  const { user } = useContext(userdatacontext);

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])


    socket.on('ride-confirmed', (data)=>{
      console.log('HI MYSELF DATA FROM RIDE SOCKET:', data);
      setwaitingfordriver(true);
      setlookingfordriver(false);
      setride(data);
    })

    useEffect(() => {
  const handleRideEnded = () => {
    setwaitingfordriver(false);
    // Optionally: navigate('/home');
  };
  socket.on('ride-ended', handleRideEnded);
  return () => {socket.off('ride-ended', handleRideEnded)};
}, [socket]);

   useEffect(() => {
  // ...other socket logic...
  const handleRideStarted = (ride) => {
    setwaitingfordriver(false);
    navigate('/riding', {state: {ride: ride}});
  };
  socket.on('ride-started', handleRideStarted);
  return () => socket.off('ride-started', handleRideStarted);
}, [socket, navigate]);



  //handler for the pickup input field
  const handlepickupchange = async (e) => {
    setpickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/suggestion_locationpanel?`,
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //handler for the dropoff input field
  const handledropffchange = async (e) => {
    setdropoff(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/suggestion_locationpanel?`,
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDropoffSuggestions(response.data);
    } catch (err) {
      //handle the error
    }
  };

  //create ride function
  async function createRide(vehicleType) {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: pickup,
        dropoff: dropoff,
        vehicleType: vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  const submithandler = (e) => {
    e.preventDefault();
  };

  //GSAP animation for the panels
  //first animation for the first panel
  useGSAP(
    function () {
      if (panelopen) {
        gsap.to(panelRef.current, {
          height: "75%",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
      }
    },
    [panelopen]
  );
  //second animation for the second panel
  useGSAP(
    function () {
      if (vehiclepanelopen) {
        gsap.to(vehiclepanelref.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclepanelref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclepanelopen]
  );

  //third animation for the third panel
  useGSAP(
    function () {
      if (confirmvehiclepanel) {
        gsap.to(confirvehicleref.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirvehicleref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmvehiclepanel]
  );

  //fourth animation for the fourth panel
  useGSAP(
    function () {
      if (lookingfordriver) {
        gsap.to(lookingfordriverref.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(lookingfordriverref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingfordriver]
  );

  //fifth animation for the fifth panel
  useGSAP(
    function () {
      if (waitingfordriver) {
        gsap.to(waitingfordriverref.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitingfordriverref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingfordriver]
  );

  //function to handle the click event of the find trip button
  async function findTrip() {
    setvehiclepanelopen(true);
    setpanelopen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/getfare`,
        {
          params: {
            pickup: pickup,
            dropoff: dropoff,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFare(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-screen relative overflow-hidden">
      

      <div className="h-screen w-screen">
        {/* image for temporary use */}
        <LiveTracking/>
      </div>
      <div className=" flex flex-col justify-end h-screen   absolute top-0 w-full  rounded-lg ">
        <div className="h-[33%] bg-white p-2.5 relative overflow-hidden">
          <h5
            onClick={() => {
              setpanelopen(false);
            }}
            className="absolute text-3xl right-5 top-2"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
            className="flex flex-col relative gap-5 mt-5 ml-5"
          >
            <div className="line h-18 absolute top-[20%] left-5 rounded-full w-1 bg-gray-700"></div>
            <input
              value={pickup}
              onClick={() => {
                setpanelopen(true), setActiveField("pickup");
              }}
              onChange={(e) => handlepickupchange(e)}
              className="bg-[#eee]  px-12 py-2  w-[90%] rounded-lg text-xl "
              type="text"
              placeholder="Add a Pickup Location"
            />

            <input
              onClick={() => {
                setpanelopen(true), setActiveField("dropoff");
              }}
              value={dropoff}
              onChange={(e) => handledropffchange(e)}
              className="bg-[#eee]  px-12 py-2  w-[90%] rounded-lg text-xl"
              type="text"
              placeholder="Enter your Dropoff Location"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-xl  w-[50%] ml-20 mt-7"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white  h-[0%]  ">
          <LocationPanel
            suggestions={
              activefield === "pickup" ? pickupSuggestions : dropoffSuggestions
            }
            setpickup={setpickup}
            setdropoff={setdropoff}
            activefield={activefield}
            vehiclepanel={vehiclepanelopen}
            setvehiclepanelopen={setvehiclepanelopen}
            panelopen={panelopen}
            setpanelopen={setpanelopen}
          />
        </div>
      </div>
      <div
        ref={vehiclepanelref}
        className="fixed z-10 h-[50%]  bottom-0 bg-white w-full p-5 flex flex-col gap-5 translate-y-full"
      >
        <Vehiclepanel
          fare={fare}
          setselectVehicleType={setselectVehicleType}
          confirmvehiclepanel={confirmvehiclepanel}
          setconfirmvehiclepanel={setconfirmvehiclepanel}
          setvehiclepanelopen={setvehiclepanelopen}
        />
      </div>

      <div
        ref={confirvehicleref}
        className="fixed z-10  bottom-0 bg-white w-full h-[70%] p-5 flex flex-col gap-5 translate-y-full"
      >
        <Confirmedvehicle
          createRide={createRide}
          pickup={pickup}
          dropoff={dropoff}
          fare={fare}
          selectvehicleType={selectvehicleType}
          setconfirmvehiclepanel={setconfirmvehiclepanel}
          setlookingfordriver={setlookingfordriver}
          setvehiclepanelopen={setvehiclepanelopen}
        />
      </div>

      <div
        ref={lookingfordriverref}
        className="fixed z-10  bottom-0 bg-white w-full h-[55%] p-5 flex flex-col gap-5 translate-y-full"
      >
        <LookingforDriver
          setlookingfordriver={setlookingfordriver}
          pickup={pickup}
          dropoff={dropoff}
          fare={fare}
          selectvehicleType={selectvehicleType}
        />
      </div>

      <div
        ref={waitingfordriverref}
        className="fixed z-10  bottom-0 bg-white w-full h-[70%] p-5 flex flex-col gap-5 translate-y-full"
      >
        <WaitingforDriver ride={ride} setwaitingfordriver={setwaitingfordriver} />
      </div>
    </div>
  );
};

export default Home;
