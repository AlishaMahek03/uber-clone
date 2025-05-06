import {React, useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import Opendropffpanel from '../components/Opendropffpanel'
import {useGSAP} from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import gsap from "gsap";
const CaptainRiding = () => {
  const [opendropoffpanel, setOpendropoffpanel] = useState(false)
  const opnedropoffpanelref = useRef(null)

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
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="h-30 w-full flex gap-5   border rounded-t-xl absolute bottom-0 shadow-lg bg-[#eee]">
        <h5  onClick={() => {
            setOpendropoffpanel(true);
          }} className="absolute top-0 right-58">
          <i className="ri-arrow-up-wide-line text-4xl text-gray-800"></i>
        </h5>
            <img src="https://rlv.zcache.ca/anime_girl_christmas_lights_square_sticker-r082a2d1a73944cc29eb60b7128e19b34_0ugmc_8byvr_200.webp" alt=""  className="h-25 p-2 border-2 mt-2 ml-2 rounded-xl"/>
            <div className='mt-8 ml-2'>
                <h2 className="text-gray-600">Picking up:</h2>
                <h3 className="ml-2 text-xl font-medium">99854 Swift Village</h3>
            </div>

            <div className="button mt-10 ml-15">
              <button  onClick={() => {
            setOpendropoffpanel(true);
          }} className="text-xl px-5 py-3 bg-yellow-500 border rounded-xl font-medium">Finish Ride</button>
            </div>
            
        </div>

        <div ref={opnedropoffpanelref}  className="fixed z-10  bottom-0 bg-white w-full h-[80%] p-5 flex flex-col gap-5 translate-y-full">
              <Opendropffpanel setOpendropoffpanel={setOpendropoffpanel}/>
        </div>
      </div>
      
      
    </div>
  )
}

export default CaptainRiding
