import React, { useState } from "react";
import { useEffect } from "react";

export default function NeededBlood(){
    const[request,setRequest]=useState([]);
   

  

    useEffect(()=>{
        const access=localStorage.getItem("access")

        const fetchRequest=async()=>{
            const response=await fetch("http://127.0.0.1:8000/api/seerequest",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${access}`

                }
            });
            const data=await response.json()
            setRequest(data);
        }
        fetchRequest();
    },[])

    const offerDonation=async(id)=>{
        const access=localStorage.getItem("access")

        const response=await fetch("http://127.0.0.1:8000/api/donation_offer/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${access}`
            },
            body:JSON.stringify({
                request:id,
                message: "I want to donate"
       }),
        });
        if(response.ok){
            alert("offer sent")
        }else{
            console.log("error:",response.data)
        }
    }


    return(
        <div>
              <br /><br />
        <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
            Required Bloods
        </h2>

        <div className="grid gap-4">
            {request.map((req) => (
            <div
                key={req.id}
                className="bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition"
            >
                <div className="flex justify-between items-center">
                
                <div>
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
                <div>
                    <button className="bg-red-500 text-white rounded-2xl p-1.5" onClick={()=>offerDonation(req.id)} >Want to Donate?</button>
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
        </div>
        </div>
    )
}