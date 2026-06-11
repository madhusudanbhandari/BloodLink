import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Loginpage";
import Register from "./pages/Registerpage";
import Donor from "./pages/Donor/Donor";
import Recipient from "./pages/Recipient/Recipient";
import Navbar from "./component/navbar";
import DashboardLayout from "./pages/DashboardLayout";
import Request from "./pages/Recipient/Request";
import Available from "./pages/Donor/Available";
import Profile from "./pages/Profile";
import MakeRequest from "./pages/Recipient/Make_request";
import ListBlood from "./pages/Donor/ListBlood";

export default function App(){
  return(
    <div>
   
      <BrowserRouter>
      <Routes>        
        <Route path="/" element={<Login/>}></Route>
        <Route path="register/" element={<Register/>}></Route>

        <Route element={<DashboardLayout/>}>
          <Route path="donor/" element={<Donor/>}></Route>
          <Route path="available" element={<Available/>}></Route>
          <Route path="listblood/" element={<ListBlood/>} ></Route>

          <Route path="recipient/" element={<Recipient/>}></Route>
          <Route path="myrequests/" element={<Request/>}></Route>
          <Route path="makerequests/" element={<MakeRequest/>}></Route>

          <Route path="myprofile/" element={<Profile/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}