import React from "react";
import { useState,useEffect } from "react";
import { data } from "react-router-dom";

export default function MakeRequest(){
    const[form,setForm]=useState({
        "blood_group": "",
        "units_required": "",
        "hospital_name": "",
        "hospital_address": "",
        "contact_num": "",
        "urgency_level":""
    })
    const [errors,setErrors]=useState({});

    const handleChange=async(e)=>{
        setForm({...form,[e.target.name]:e.target.value})

    }

    const access=localStorage.getItem("access")

    const handleSubmit=async(e)=>{
        e.preventDefault()

        console.log(access);
        console.log({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        });

        try{
        const response=await fetch("http://127.0.0.1:8000/api/request/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${access}`
            },
            body:JSON.stringify(form)
        })
        const data=await response.json();

        if(!response.ok){
            console.log("status:",response.status)
            console.log("Error response:",data);
            setErrors(data);
            return;

        }else{
            console.log("Success:",data)
            alert("Registration Successfull")
        }
    }catch(err){
        console.log("Error is:",err)
    }
}

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
     
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
      
        
        <h2 className="text-3xl font-bold text-center mb-8">
          Make Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
          <div>
            <label className="block mb-2 font-medium">Blood Group</label>
            <input
              type="text"
              name="blood_group"
              value={form.blood_group}
              onChange={handleChange}
              placeholder="Enter required group"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.blood_group && (
                <p className="text-red-500 text-sm">
                    {errors.blood_group[0]}
                </p>
            )}
          </div>

        
          <div>
            <label className="block mb-2 font-medium">Units Required</label>
            <input
              type="number"
              name="units_required"
              value={form.units_required}
              onChange={handleChange}
              placeholder="Enter units required"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.units_required && (
            <p className="text-red-500 text-sm">
                {errors.units_required[0]}
            </p>
            )}
          </div>

          
          <div>
            <label className="block mb-2 font-medium">Hospital Name</label>
            <input
              type="text"
              name="hospital_name"
              value={form.hospital_name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.hospital_name && (
            <p className="text-red-500 text-sm">
                {errors.hospital_name[0]}
            </p>
            )}
          </div>

    
          <div>
            <label className="block mb-2 font-medium">Hospital Address</label>
            <input
              type="text"
              name="hospital_address"
              value={form.hospital_address}
              onChange={handleChange}
              placeholder="Enter hospital address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.hospital_address && (
            <p className="text-red-500 text-sm">
                {errors.hospital_address[0]}
            </p>
            )}
          </div>

          
          <div>
            <label className="block mb-2 font-medium">Contact Number</label>
            <input
              type="number"
              name="contact_num"
              placeholder="enter contact"
              onChange={handleChange}
              value={form.contact_num}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        
            {errors.contact_num && (
            <p className="text-red-500 text-sm">
                {errors.contact_num[0]}
            </p>
            )}
          </div>

       
          <div>
            <label className="block mb-2 font-medium">Urgency Level</label>
            <select
              name="urgency_level"
              onChange={handleChange}
              value={form.urgency_level}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >   
               <option value="">Select urgency level</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {errors.urgency_level && (
            <p className="text-red-500 text-sm">
                {errors.urgency_level[0]}
            </p>
            )}
          </div>
      
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Make Request
          </button>
          
        </form>
      </div>
    </div>
  );
}