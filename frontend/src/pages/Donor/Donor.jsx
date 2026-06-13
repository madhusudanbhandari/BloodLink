import React, { useState } from "react";
import { useEffect } from "react";

export default function Donor(){
    //const[request,setRequest]=useState([]);
    const[user,setUser]=useState({});
    const[requests,setRequests]=useState([]);

    useEffect(()=>{
        const access=localStorage.getItem("access");

        fetch("http://127.0.0.1:8000/api/donor_donation_requests/",{
            headers:{
                "Authorization":`Bearer ${access}`,
            }
        })
        .then(res=>res.json())
        .then(data=>setRequests(data));
    },[]);


    // useEffect(()=>{
    //     const access=localStorage.getItem("access")

    //     const fetchRequest=async()=>{
    //         const response=await fetch("http://127.0.0.1:8000/api/seerequest",{
    //             method:"GET",
    //             headers:{
    //                 "Content-Type":"application/json",
    //                 "Authorization":`Bearer ${access}`

    //             }
    //         });
    //         const data=await response.json()
    //         setRequest(data);
    //     }
    //     fetchRequest();
    // },[])

    useEffect(()=>{
            const access=localStorage.getItem("access")
    
            const fetchUser=async()=>{
                const response=await fetch("http://127.0.0.1:8000/api/myprofile/",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${access}`
                    }
                });
                const data=await response.json()
                setUser(data);
            }
            fetchUser();
        },[])


    return(
        <div>
            <br /><br />
            
                <div className="flex flex-col items-center text-center">
                    <div>Welcome!</div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-4">
                        {user.username}
                    </h2>
              
                    <span className="mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold capitalize">
                        {user.role}
                    </span>
                </div>
                <br /><br />

              
        <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
            Blood Requests
        </h2>
                        <div className="space-y-4">

                {requests.map((req) => (

                    <div
                        key={req.id}
                        className="bg-white p-5 rounded-xl shadow"
                    >
                        <h2 className="font-bold text-red-600">
                            {req.blood_group}
                        </h2>

                        <p>
                            Recipient: {req.recipient_username}
                        </p>

                        <p>
                            Contact: {req.contact_num}
                        </p>

                        <p>
                            Location: {req.location}
                        </p>

                        <p>
                            Hospital: {req.hospital}
                        </p>

                        <p>
                            Urgency: {req.urgency}
                        </p>

                        <p>
                            Status: {req.status}
                        </p>

                    </div>

                ))}

            </div>

            
        {/* <div className="grid gap-4">
            {request.map((req) => (
            <div
                key={req.id}
                className="bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition"
            >
                <div className="flex justify-between items-center">
                
                <div>
                    <h3 className="font-bold">
                        {req.recipient_username}
                    </h3>
                    <h3 className="text-lg font-semibold text-red-600">
                    {req.blood_group}
                    </h3>

                    <p className="text-gray-600 mt-1">
                    🏥 {req.hospital_name}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                    📍 {req.hospital_address}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">
                    Units Required
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                    {req.units_required}
                    </p>
                </div>

                </div>
            </div>
            ))}
        </div> */}


        </div>
    )
}