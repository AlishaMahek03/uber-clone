import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { CaptainDataContext } from "../context/Captaincontext";
const Captainlogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handle_submit = async(e) => {
    e.preventDefault();
    const captaindata = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}` + "/captains/login",
      captaindata
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      localStorage.setItem("captain", JSON.stringify(data.captain));
      console.log(data.captain);
      alert("Captain Logged In Successfully");
      navigate("/captain-home");
    } else {
      alert("Error logging in captain");
    }
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
            <h2 className="mt-5 ml-5 text-4xl">Welcome Back Captain!</h2>
            <form
              onSubmit={(e) => {
                handle_submit(e);
              }}
              className="flex flex-col ml-5 gap-5  h-screen"
            >
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
              <button className="bg-black text-2xl border rounded-xl ml-5 w-[80%] px-5 py-2 text-white mt-2">
                Login
              </button>
              <div className="flex flex-col  justify-center items-center">
              <p className="text-xl font-bold text-center">Register here?</p>{" "}
              <Link
                to="/captain-signup"
                className="text-blue-700 text-xl underline px-3 text-center"
              >
                Create Your New Login Details!
              </Link>
              </div>
              <Link
                to="/login"
                className="bg-[#e5952b] text-2xl border rounded-xl ml-5 w-[80%] px-5 py-2 text-center text-white font-medium mt-2"
              >
                Sign in as User!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Captainlogin;
