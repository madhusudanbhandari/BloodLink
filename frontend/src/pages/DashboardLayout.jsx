import React from "react";
import Navbar from "../component/navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout(){
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}