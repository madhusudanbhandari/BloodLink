import React from "react";
import {useState, useEffect } from "react";


export default function Recipient(){

    const [list,setList]=useState([])

     useEffect(()=>{
        const access=localStorage.getItem("access")
        
        const fetchlist=async()=>{
            const response=await fetch("http://127.0.0.1:8000/api/seeblood/",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${access}`
                }
            });
            const data=await response.json()
            setList(data);
     

        }
        fetchlist();
    },[])

     const [user,setUser]=useState({})
    
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
            
                <div className="flex flex-col items-center text-center">
                    <br /><br />
                    <p>Welcome</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-4">
                        {user.username}
                    </h2>
          
                    <span className="mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold capitalize">
                        {user.role}
                    </span>
                </div>
            <br /><br />
            <h2 className="text-3xl font-bold text-center mn-8">Available Blood</h2>

          <div className="grid gap-4">
            {list.map((li) => (
            <div
                key={li.id}
                className="bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition"
            >
                <div className="flex justify-between items-center">
                
                <div>
                    <h3 className="font-bold">{li.donor_username}</h3>
                    <h3 className="text-lg font-semibold text-red-600">
                    {li.blood_group}
                    </h3>

                    <p className="text-gray-600 mt-1">
                    {li.location}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                    {li.contact}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">
                    Units Available
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                    {li.units_available}
                    </p>
                </div>

                </div>
            </div>
            ))}
        </div>

        </div>
    )
}