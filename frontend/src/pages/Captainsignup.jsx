import { React, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/Captaincontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Usersignup = () => {
  const navigate = useNavigate();
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //vehicle data
  const [vehiclecolor, setvehiclecolor] = useState("");
  const [vehicleplate, setvehicleplate] = useState("");
  const [vehiclecapacity, setvehiclecapacity] = useState("");
  const [vehicletypes, setvehicletypes] = useState("");

  

  const {captain, setCaptain} = useContext(CaptainDataContext);


  const handle_submit = async(e) => {
    e.preventDefault();
    const captainData = {
      fullname:{
        firstname: fname,
        lastname: lname
      },
      email: email,
      password:  password,
      vehicle: {
        color: vehiclecolor,
        plate: vehicleplate,
        capacity: vehiclecapacity,
        vehicletypes: vehicletypes
      }
    };
const response = await axios.post(import.meta.env.VITE_BASE_URL + "/captains/register", captainData)
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      localStorage.setItem("captain", JSON.stringify(data.captain));
      alert("Captain Created Successfully");
      navigate("/captain-home");
    } else {
      alert("Error creating captain");
    }
    setfname("");
    setlname("");
    setemail("");
    setpassword("");
    setvehiclecolor("");
    setvehicleplate("");
    setvehiclecapacity("");
    setvehicletypes("");
  };
  return (
    <div>
      <div className="flex flex-col justify-between">
      <div className="h-screen w-screen m-0 p-0">
        <div>
        <img
          className="w-55 "
          src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
          handle_submit(e);
          }}
          className="flex flex-col ml-5 gap-5  h-screen"
        >
          <h3 className="text-2xl mt-10 font-medium">What's Our Captain name?</h3>
          <div className="flex gap-5 ">
          <input
            value={fname}
            onChange={(e) => setfname(e.target.value)}
            type="text"
            placeholder="John"
            required
            className="bg-[#eeeeee] text-xl  h-12 w-[45%] text-start px-2"
          />
          <input
            value={lname}
            onChange={(e) => setlname(e.target.value)}
            type="text"
            placeholder="Doe"
            required
            className="bg-[#eeeeee] text-xl  h-12 w-[45%] text-start px-2"
          />
          </div>

          <h3 className="text-2xl  font-medium">What's your email?</h3>
          <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email"
          placeholder="email@example.com"
          required
          className="bg-[#eeeeee] text-xl  h-12 w-[90%] text-start px-2"
          />
          
          

          <label className="text-2xl font-medium">
          Enter your password...
          </label>
          <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password"
          placeholder="Abc@123"
          required
          className="bg-[#eeeeee] text-xl h-12 w-[90%] text-start px-4"
          />


<h3 className="text-2xl font-medium">Vehicle Details</h3>
          <input
          value={vehiclecolor}
          onChange={(e) => setvehiclecolor(e.target.value)}
          type="text"
          placeholder="Vehicle Color"
          required
          className="bg-[#eeeeee] text-xl h-12 w-[90%] text-start px-2"
          />
          <input
          value={vehicleplate}
          onChange={(e) => setvehicleplate(e.target.value)}
          type="text"
          placeholder="Vehicle Plate Number"
          required
          className="bg-[#eeeeee] text-xl h-12 w-[90%] text-start px-2"
          />
          <input
          value={vehiclecapacity}
          onChange={(e) => setvehiclecapacity(e.target.value)}
          type="number"
          placeholder="Vehicle Capacity"
          required
          className="bg-[#eeeeee] text-xl h-12 w-[90%] text-start px-2"
          />

          <div className="flex gap-5 items-center">
            <h3 className="text-xl font-medium">Vehicle Type:</h3>
            <select
              value={vehicletypes}
              onChange={(e) => setvehicletypes(e.target.value)}
              required
              className="bg-[#eeeeee] text-xl h-12 px-4"
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button className="bg-black text-2xl border rounded-xl w-[90%] px-5 py-2 text-white mt-2">
          Create Account
          </button>

          <p className="text-xl mt-5 ml-5">Have An Account?<Link
          to="/captain-login"
          className="text-[#1c748c] text-xl w-[90%] px-2 py-2 text-center font-medium mt-2"
          >
          Log in as Captain!
          </Link></p>
          <div className="flex gap-2 mt-5">
          <input type="checkbox" name="" id="" />
          <p className="text-xm ">
            By proceeding you consent to get calls, WhatsApp or SMS
            messages including by automated means, from Uber and its
            affilates to the number provided.
          </p>
          </div>
        </form>
        </div>
      </div>
      </div>
    </div>
    );
};

export default Usersignup;
