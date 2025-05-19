import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { userdatacontext } from "../context/Userdata";

const Usersignup = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [fullname, setfullname] = useState({});
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [usersignupdata, setusersignupdata] = useState({});
  const navigate = useNavigate();

  const {user, setuser} = useContext(userdatacontext);

  const handle_submit = async(e) => {
    e.preventDefault();

    const new_user = {
      fullname: {
        firstname: fname,
        lastname: lname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, new_user);

    if (response.status === 201) {
      const data = response.data;
      setuser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Save user data in local storage
      navigate("/home");z
    }

    setfullname({});
    setfname("");
    setlname("");
    setemail("");
    setpassword("");
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
              <h3 className="text-2xl mt-10 font-medium">What's your name?</h3>
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
              <button className="bg-black text-2xl border rounded-xl w-[90%] px-5 py-2 text-white mt-2">
                Create Account
              </button>

              <p className="text-2xl mt-5 ml-5">Already have an account?<Link
                to="/login"
                className=" text-2xl  w-[90%] px-2 text-center text-blue-500 font-medium mt-2"
              >
                  Log in
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
