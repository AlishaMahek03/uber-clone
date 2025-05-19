import {React, useState, useRef, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {useGSAP} from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import Ridepopup from "../components/Ridepopup";
import Confirmridepopup from "../components/Confirmridepopup";
import axios from "axios";
import { CaptainDataContext } from "../context/Captaincontext";
import { SocketContext } from "../context/SocketContext";




const CaptainHome = () => {

  const {captain} = useContext(CaptainDataContext);
  //ride popup panel
  const [ridePopup, setRidePopup] = useState(false);
  const ridepopupref = useRef(null);
  //confirm ride panel
  const [confirmride, setconfirmride] = useState(false)
  const confirmRideRef = useRef(null);

  //ride variable holding the data
  const [ride, setride] = useState(null);

  //the function for confirm ride after confirmpanel
  async function confirmridefunction (){
    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    // If successful, move to next UI state
    setconfirmride(true);// <-- Make sure this state exists and is used in your UI
  } catch (err) {
    console.error("Ride confirmation failed:", err);
    // Optionally show an error to the user
  }
  }
  const {socket} = useContext(SocketContext);
  useEffect(()=>{
    if (!captain) return;
    
    socket.emit("join", {userType: "captain", userId: captain._id})

    const interval = setInterval(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    }, 10000);
    // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, [captain])



    useEffect(() => {
  if (!socket) return;

  const handleNewRide = (data) => {
    console.log("Received new-ride event:", data);
    setride(data);
    setRidePopup(true);
  };

  socket.on("new-ride", handleNewRide);

  return () => {
    socket.off("new-ride", handleNewRide);
  };
}, [socket]);

    


  //first animation for the first panel
  useGSAP(function(){
    if(ridePopup){ 
    gsap.to(ridepopupref.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(ridepopupref.current, {
        transform: "translateY(100%)",
      })
    }
  }, [ridePopup])
  //second animation for the second panel
  useGSAP(function(){
    if(confirmride){ 
    gsap.to(confirmRideRef.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      })
    }
  }, [confirmride])
  return (
    <div className="h-screen">
      <div>
        <img
          src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_-512x512.png"
          alt=""
          className="w-25 absolute left-1 top-2"
        />
        <Link
          to={"/captain-login"}
          className="mt-5 fixed h-12 w-12 bg-white flex items-center justify-center right-0 rounded-full"
        >
          <i className="ri-logout-box-r-fill text-2xl"></i>
        </Link>
      </div>

      {/* //The Map  */}
      <div className="h-1/2">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* //The below half of the screen */}
      <div className="h-1/2  relative">
        <CaptainDetails captain={captain}/>
        <div ref={ridepopupref}  className="fixed z-10  bottom-0 bg-white w-full h-[60%] p-5 flex flex-col gap-5 translate-y-full">
              <Ridepopup confirmridefunction={confirmridefunction} ride={ride} setconfirmride={setconfirmride} setRidePopup={setRidePopup}/>
        </div>
        <div ref={confirmRideRef}  className="fixed z-10  bottom-0 bg-white w-full h-[90%] p-5 flex flex-col gap-5 translate-y-full">
              <Confirmridepopup ride={ride} setconfirmride={setconfirmride} setRidePopup={setRidePopup}/>
        </div>

      </div>
     
    </div>
  );
};

export default CaptainHome;
