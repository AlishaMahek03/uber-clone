import React from 'react'

const CaptainDetails = ({captain}) => {
  if (!captain) return null; 
  return (
    <div>
      <div>
        <img
          className="h-30 w-30 absolute z-10 top-5 rounded-full bg-center"
          src="https://a.storyblok.com/f/284380/b12e9904d8/five-star-uber-driver.jpg"
          alt=""
        />
        <img
          className="h-40 w-40 absolute left-23  top-0 "
          src="https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.jpg?s=612x612&w=0&k=20&c=MkM3U9ruXp2wKCgYKeL6DyZ9H5WFIHtyRWsbOMokrFg="
          alt=""
        />
        <h2 className="absolute top-2 right-3 text-xl text-gray-500">
          {captain.fullname.firstname}  {captain.fullname.lastname}
        </h2>

        <h3 className="absolute top-9 right-3 text-2xl font-bold ">
          {captain.vehicle.plate}
        </h3>

        <p className=" absolute top-18 right-3 text-xl text-gray-500">
          {captain.vehicle.color} {captain.vehicle.vehicletypes}
        </p>

        <p className="absolute right-3 top-29 text-xl text-gray-500">★ 4.9</p>


        <div className="bg-yellow-500 w-[100%] h-[40%]  absolute top-50  rounded-xl flex justify-between gap-2 ">
          <div>
            <h2 className="px-10 pt-8"><i className="ri-time-line text-5xl text-gray-600"></i></h2>
            <p className="Time text-2xl px-10 font-medium pt-2">10.2</p>
            <p className="text-gray-600 px-3 Onlinehours text-xl  ml-2">Hours Online</p>
          </div>
          <div>
            <h2 className="px-10 pt-8"><i className="ri-pin-distance-fill text-5xl text-gray-600"></i></h2>
            <p className="Time font-medium text-2xl px-10 pt-2">30KM</p>
            <p className="text-gray-600 Onlinehours text-xl px-5  ">Total Distance</p>
          </div>
          <div>
            <h2 className="px-10 pt-8"><i className="ri-money-dollar-box-fill text-gray-600 text-5xl"></i></h2>
            <p className="Time font-medium text-2xl px-6 pt-2">$178.76</p>
            <p className="Onlinehours text-xl text-gray-600  ">Money Earned</p>
          </div>
        </div>
        </div>
    </div>
  )
}

export default CaptainDetails
