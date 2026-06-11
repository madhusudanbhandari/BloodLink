import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){

    const navItems={
        donor:[
            {name:"Availble Blood", path:'/available'},
            {name:"List Blood", path:'/listblood'}
        ],
        recipient:[
            {name:"My-Requests", path:'/myrequests'},
            {name:"Make-Request",path:'/makerequests'}

        ]
    }
    const role=localStorage.getItem("role");

    return(
       <nav className="bg-blue-400 text-white px-1 py-0 shadow-md">
        <div className="flex justify-between items-counter">
            <h1 className="text-0.5xl font-bld">BloodLink</h1>

             <div className="flex gap-6">
                
                <Link to="/myprofile">My Profile</Link>

                {navItems[role]?.map((item)=>(
                    <Link key={item.path} to={item.path}>
                        {item.name}
                    </Link>
                ))}
                  

            </div>
        </div>
       </nav>
    )
}