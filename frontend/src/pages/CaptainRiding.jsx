import {React, useState, useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Opendropffpanel from '../components/Opendropffpanel'
import {useGSAP} from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import gsap from "gsap";
import LiveTracking from '../components/LiveTracking';
const CaptainRiding = () => {
  const [opendropoffpanel, setOpendropoffpanel] = useState(false)
  const opnedropoffpanelref = useRef(null)

  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(rideData)

  //first animation for the first panel
  useGSAP(function(){
    if(opendropoffpanel){ 
    gsap.to(opnedropoffpanelref.current, {
      transform: "translateY(0%)",
    })}else{
      gsap.to(opnedropoffpanelref.current, {
        transform: "translateY(100%)",
      })
    }
  }, [opendropoffpanel])
  return (
    <div className="h-screen overflow-hidden">
        
        <Link to={
            "/captain-home"
        } className="fixed h-12 w-12 bg-white flex items-center justify-center rounded-full">
            <i className="ri-home-4-fill text-xl font-medium"></i>
        </Link>
      <div className="h-[100%] relative">
        <LiveTracking/>
        <div className="h-35 w-full flex gap-5   border rounded-t-xl absolute bottom-0 shadow-lg bg-[#eee]">
        <h5  onClick={() => {
            setOpendropoffpanel(true);
          }} className="absolute top-0 right-48">
          <i className="ri-arrow-up-wide-line text-4xl text-gray-800"></i>
        </h5>
            <div className='mt-6 ml-2 w-90'>
                <h2 className="text-gray-600 font-bold mb-2">Picking up:</h2>
                <h3 className="ml-2 text-xl font-medium">{rideData?.pickup}</h3>
            </div>

            <div className="button mt-10 ml-3 mr-2">
              <button  onClick={() => {
            setOpendropoffpanel(true);
          }} className="text-xl px-5 py-3 bg-yellow-500 border rounded-xl font-medium">Finish Ride</button>
            </div>
            
        </div>

        <div ref={opnedropoffpanelref}  className="fixed z-10  bottom-0 bg-white w-full h-[80%] p-5 flex flex-col gap-5 translate-y-full">
              <Opendropffpanel rideData={rideData} setOpendropoffpanel={setOpendropoffpanel}/>
        </div>
      </div>
      
      
    </div>
  )
}

export default CaptainRiding
