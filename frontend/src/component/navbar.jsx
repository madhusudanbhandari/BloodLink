import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
       <nav className="bg-blue-400 text-white px-1 py-0 shadow-md">
        <div className="flex justify-between items-counter">
            <h1 className="text-0.5xl font-bld">BloodLink</h1>

             <div className="flex gap-6">

                    {/* <Link
                        to="/profile"
                        className="hover:text-red-200 transition"
                    >
                        My Profile
                    </Link> */}
 
                    <Link
                        to="/myrequests"
                        className="hover:text-red-200 transition"
                    >
                        My Requests
                    </Link> 

                    {/* <Link
                        to="/availableblood"
                        className="hover:text-red-200 transition"
                    >
                        Available Blood
                    </Link> */}

                    {/* <Link
                        to="/donationhistory"
                        className="hover:text-red-200 transition"
                    >
                        Donation History
                    </Link> */}

                </div>
        </div>
       </nav>
    )
}