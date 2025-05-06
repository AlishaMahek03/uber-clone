import React, { useRef, useState } from "react";
import {useGSAP} from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import gsap from "gsap";
import LocationPanel from "../components/LocationPanel";
import Vehiclepanel from "../components/Vehiclepanel";
import Confirmedvehicle from "../components/Confirmedvehicle";
import LookingforDriver from "../components/LookingforDriver";
import WaitingforDriver from "../components/WaitingforDriver";
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

  const submithandler = (e) => {
    e.preventDefault();
  }

  //GSAP animation for the panels
  //first animation for the first panel
  useGSAP(function(){
    if(panelopen){
      gsap.to(panelRef.current, {
        height: "75%",
      })}else{
        gsap.to(panelRef.current, {
          height: "0%",
        })
      }
  }, [panelopen])
  //second animation for the second panel
  useGSAP(function(){
    if(vehiclepanelopen){ 
    gsap.to(vehiclepanelref.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(vehiclepanelref.current, {
        transform: "translateY(100%)",
      })
    }
  }, [vehiclepanelopen])

  //third animation for the third panel
  useGSAP(function(){
    if(confirmvehiclepanel){ 
    gsap.to(confirvehicleref.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(confirvehicleref.current, {
        transform: "translateY(100%)",
      })
    }
  }, [confirmvehiclepanel])

  //fourth animation for the fourth panel
  useGSAP(function(){
    if(lookingfordriver){ 
    gsap.to(lookingfordriverref.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(lookingfordriverref.current, {
        transform: "translateY(100%)",
      })
    }
  }, [lookingfordriver])

  //fifth animation for the fifth panel
  useGSAP(function(){
    if(waitingfordriver){ 
    gsap.to(waitingfordriverref.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(waitingfordriverref.current, {
        transform: "translateY(100%)",
      })
    }
  }, [waitingfordriver])


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://brandlogos.net/wp-content/uploads/2021/12/uber-brandlogo.net_-512x512.png"
        alt=""
        className="w-25 absolute left-1 top-2"
      />

      <div   className="h-screen w-screen">
        {/* image for temporary use */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" flex flex-col justify-end h-screen   absolute top-0 w-full  rounded-lg ">
        <div className="h-[25%] bg-white p-2.5 relative">
          <h5 onClick={()=>{setpanelopen(false)}} className="absolute text-3xl right-5 top-2">
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a Trip</h4>
          <form onSubmit={(e)=>{submithandler(e)}} className="flex flex-col relative gap-5 mt-5 ml-5">
            <div className="line h-18 absolute top-[20%] left-5 rounded-full w-1 bg-gray-700"></div>
            <input
              value={pickup}
              onClick={() => setpanelopen(true)}
              onChange={(e) => setpickup(e.target.value)}
              className="bg-[#eee]  px-12 py-2  w-[90%] rounded-lg text-xl "
              type="text"
              placeholder="Add a Pickup Location"
            />
            <input
              onClick={() => setpanelopen(true)}
              value={dropoff}
              onChange={(e) => setdropoff(e.target.value)}
              className="bg-[#eee]  px-12 py-2  w-[90%] rounded-lg text-xl"
              type="text"
              placeholder="Enter your Dropoff Location"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white  h-[0%]  ">
          <LocationPanel vehiclepanel={vehiclepanelopen} setvehiclepanelopen={setvehiclepanelopen} panelopen={panelopen} setpanelopen={setpanelopen}/>
        </div>
      </div>
      <div ref={vehiclepanelref} className="fixed z-10  bottom-0 bg-white w-full p-5 flex flex-col gap-5 translate-y-full">

        <Vehiclepanel confirmvehiclepanel={confirmvehiclepanel} setconfirmvehiclepanel={setconfirmvehiclepanel}  setvehiclepanelopen={setvehiclepanelopen}/>
        
      </div>


      <div ref={confirvehicleref} className="fixed z-10  bottom-0 bg-white w-full h-[60%] p-5 flex flex-col gap-5 translate-y-full">

        <Confirmedvehicle setconfirmvehiclepanel={setconfirmvehiclepanel}  setlookingfordriver={setlookingfordriver}/>
        
      </div>

      <div  ref={lookingfordriverref} className="fixed z-10  bottom-0 bg-white w-full h-[60%] p-5 flex flex-col gap-5 translate-y-full">

        <LookingforDriver  setlookingfordriver={setlookingfordriver}/>
        
      </div>

      <div ref={waitingfordriverref}   className="fixed z-10  bottom-0 bg-white w-full h-[60%] p-5 flex flex-col gap-5 translate-y-full">

        <WaitingforDriver  setwaitingfordriver={setwaitingfordriver}/>
        
      </div>
    </div>
  );
};

export default Home;
