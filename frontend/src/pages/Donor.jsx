import React, { useEffect } from "react";
import { useState } from "react";

export default function Donor(){
    const[form, setForm]=useState({
          "blood_group":"",
          "last_donated":"",
          "location":"",
          "contact":"",
          "units_available":""
    })
    const [errors,setErrors]=useState({})
    const [list,setList]=useState([])

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const access=localStorage.getItem('access')

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
        const response=await fetch("http://127.0.0.1:8000/api/listblood/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${access}`
            },
            body:JSON.stringify(form)
        });
        const data=await response.json()
        
        if(!response.ok){
            console.log("Status:",response.status)
            console.log("Error:",data)
            setErrors(data)
        }else{
            console.log("Success:",data)
            console.log("Registration Successfull")

        }
    }catch(err){
        console.log("Error:",err)
    }
}
    useEffect(()=>{
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

    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        
        <h2 className="text-3xl font-bold text-center mn-8">Available Blood</h2>

          <div className="grid gap-4">
            {list.map((li) => (
            <div
                key={li.id}
                className="bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition"
            >
                <div className="flex justify-between items-center">
                
                <div>
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


        <h2 className="text-3xl font-bold text-center mb-8">
          List Available Blood
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
          <div>
            <label className="block mb-2 font-medium">Blood Group</label>
            <input
              type="text"
              name="blood_group"
              value={form.blood_group}
              onChange={handleChange}
              placeholder="Enter available group"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.blood_group && (
                <p className="text-red-500 text-sm">
                    {errors.blood_group[0]}
                </p>
            )}
          </div>

        
          <div>
            <label className="block mb-2 font-medium">Last Donated</label>
            <input
              type="date"
              name="last_donated"
              value={form.last_donated}
              onChange={handleChange}
              placeholder="Enter Date you last donated"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.last_donated && (
            <p className="text-red-500 text-sm">
                {errors.last_donated[0]}
            </p>
            )}
          </div>

          
            
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.location && (
            <p className="text-red-500 text-sm">
                {errors.location[0]}
            </p>
            )}
          </div>

          
          <div>
            <label className="block mb-2 font-medium">Contact Number</label>
            <input
              type="number"
              name="contact"
              placeholder="enter contact"
              onChange={handleChange}
              value={form.contact}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        
            {errors.contact && (
            <p className="text-red-500 text-sm">
                {errors.contact[0]}
            </p>
            )}
          </div>

       
          <div>
            <label className="block mb-2 font-medium">Available units</label>
            <input
              type="number"
              name="units_available"
              onChange={handleChange}
              value={form.units_available}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />   
              
            {errors.units_available && (
            <p className="text-red-500 text-sm">
                {errors.units_available[0]}
            </p>
            )}
          </div>
      
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            List 
          </button>
          
        </form>
        </div>
     </div>
    )
}