import React, { useEffect } from "react";
import { useState } from "react";

export default function Profile(){
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

    return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">

        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-gray-100">

            <div className="bg-gradient-to-r from-blue-400 to-blue-400 h-32"></div>

            <div className="px-8 pb-8 -mt-16">

              
                <div className="flex flex-col items-center text-center">

                    <div className="w-28 h-28 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center text-3xl font-bold text-red-500">
                        {user.username?.charAt(0).toUpperCase()}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-4">
                        {user.username}
                    </h2>

                    <p className="text-gray-500">{user.email}</p>

               
                    <span className="mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold capitalize">
                        {user.role}
                    </span>
                </div>

           
                <div className="grid md:grid-cols-2 gap-6 mt-10">

                    <div className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                        <p className="text-gray-400 text-sm">Blood Group</p>
                        <p className="text-xl font-bold text-red-600">
                            {user.blood_group}
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                        <p className="text-gray-400 text-sm">Gender</p>
                        <p className="text-xl font-bold text-gray-800 capitalize">
                            {user.gender}
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-xl font-bold text-gray-800">
                            {user.location}
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                        <p className="text-gray-400 text-sm">Age</p>
                        <p className="text-xl font-bold text-gray-800">
                            {user.age}
                        </p>
                    </div>

                </div>

            
                
            </div>
        </div>
    </div>
);
}