import {React, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import { useContext } from "react";
import { userdatacontext } from "../context/Userdata";
import axios from "axios";
const Userlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userdata, setuserdata] = useState({})

  const navigate = useNavigate();

  const {user, setuser} = useContext(userdatacontext);
  

  const handle_submit = async(e) => {
    e.preventDefault();
    const new_user = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, new_user);

    if (response.status === 200) {
      const data = response.data;
      setuser(data.user);
      console.log(user)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Save user data in local storage
      navigate("/home");
    }
    setemail("");
    setpassword("");
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="h-screen w-screen m-0 p-0">
        <div>
        <img className='w-55 ' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
        <h2 className="mt-5 ml-5 text-4xl">Let’s Get You Signed In</h2>
        <form onSubmit={(e)=>{handle_submit(e)}} className="flex flex-col ml-5 gap-5  h-screen">
          <h3 className="text-2xl mt-10 font-medium">What's your email?</h3>
          <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="email@example.com"
            required
            className="bg-[#eeeeee] text-xl  h-12 w-[90%] text-start px-2"
          />
          <label className="text-2xl  font-medium">
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

          <div className="flex items-center justify-center flex-col gap-7">
          <button className="bg-black text-2xl border  rounded-xl w-[50%] px-5 py-3 text-white mt-2">
            Login
          </button>

          <p className="text-xl font-bold text-center">New here? <Link to='/signup' className="text-blue-500 underline px-3 text-xl">Create new Account!</Link></p>
          <Link to='/captain-login' className="bg-[#359b68] text-2xl border rounded-xl  w-[50%] px-5 py-3 text-center text-white font-medium mt-2">
              Sign in as Captain
            </Link>

            </div>
        </form>
        
        </div>
      </div>
    </div>
  );
};

export default Userlogin;
