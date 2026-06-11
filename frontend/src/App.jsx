import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Loginpage";
import Register from "./pages/Registerpage";
import Donor from "./pages/Donor";
import Recipient from "./pages/Recipient";

export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="register/" element={<Register/>}></Route>
        <Route path="donor/" element={<Donor/>}></Route>
        <Route path="recipient/" element={<Recipient/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}