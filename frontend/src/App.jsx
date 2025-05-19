import React from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Userlogin from "./pages/Userlogin";
import Usersignup from "./pages/Usersignup";
import Captainsignup from "./pages/Captainsignup";
import Captainlogin from "./pages/Captainlogin";
import CaptainHome from "./pages/CaptainHome";
import { userdatacontext } from "./context/Userdata";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import Captainlogout from "./pages/Captainlogout";
import UserLogout from "./pages/UserLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Userlogin />}></Route>
        <Route path="/signup" element={<Usersignup />}></Route>
        <Route path="/captain-login" element={<Captainlogin />}></Route>
        <Route path="/captain-signup" element={<Captainsignup />}></Route>
        <Route
          path="/home"
          element={

              <Home />
      
          }
        ></Route>

        <Route
          path="/riding"
          element={
          
              <Riding />
        
          }
        ></Route>
        <Route
          path="/users/logout"
          element={

              <UserLogout />
     
          }
        ></Route>
        <Route
          path="/captain-home"
          element={
       
              <CaptainHome />
            
          }
        ></Route>

        <Route
          path="/captain/riding"
          element={
              <CaptainRiding />
          }
        ></Route>

        <Route
          path="/captains/logout"
          element={
            
              <Captainlogout />
            
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
