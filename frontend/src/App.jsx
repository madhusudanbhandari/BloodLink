import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Loginpage";
import Register from "./pages/Registerpage";

export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="register/" element={<Register/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}