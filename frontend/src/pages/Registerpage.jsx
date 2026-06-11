import React from "react";
import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
    const[form,setForm]=useState({
        "username":"",
        "email":"",
        "password":"",
        "age":"",
        "blood_group":"",
        "gender":"",
        "location":"",
        "role":"",
        "last_donated": "",
        "is_available": true,
        "required_blood": "",
        "hospital_name": ""
    })
    const [loading,setLoading]=useState(false)
    const[errors,setErrors]=useState({});
    const[role,setRole]=useState({});

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})


    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)

        try{
        const response=await fetch("http://127.0.0.1:8000/api/register/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(form)
        });
        const data=await response.json();

        if(!response.ok){
            setErrors(data);
        }else{
            console.log("success:",data);
            alert("Registration Successfull")
        }

    }catch(error){
        console.log("error");
    }finally{
        setLoading(false);
    }

    }
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          BloodLink Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
          <div>
            <label className="block mb-2 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.username && (
                <p className="text-red-500 text-sm">
                    {errors.username[0]}
                </p>
            )}
          </div>

        
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
            <p className="text-red-500 text-sm">
                {errors.email[0]}
            </p>
            )}
          </div>

          
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
            <p className="text-red-500 text-sm">
                {errors.password[0]}
            </p>
            )}
          </div>

    
          <div>
            <label className="block mb-2 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.age && (
            <p className="text-red-500 text-sm">
                {errors.age[0]}
            </p>
            )}
          </div>

          
          <div>
            <label className="block mb-2 font-medium">Blood Group</label>
            <select
              name="blood_group"
              onChange={handleChange}
              value={form.blood_group}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.blood_group && (
            <p className="text-red-500 text-sm">
                {errors.blood_group[0]}
            </p>
            )}
          </div>

       
          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              value={form.gender}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
            <p className="text-red-500 text-sm">
                {errors.gender[0]}
            </p>
            )}
          </div>

        
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={form.location}
              placeholder="Enter location"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.location && (
            <p className="text-red-500 text-sm">
                {errors.location[0]}
            </p>
            )}
          </div>

         
          <div>
            <label className="block mb-2 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Role</option>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
            </select>
            {errors.role && (
            <p className="text-red-500 text-sm">
                {errors.role[0]}
            </p>
            )}
          </div>
         {form.role === "donor" && (
            <>
                <div>
                <label className="block mb-2 font-medium">
                    Last Donated
                </label>
                <input
                    type="date"
                    name="last_donated"
                    value={form.last_donated}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                </div>

                <div>
                <label className="block mb-2 font-medium">
                    Available to Donate
                </label>

                <select
                    name="is_available"
                    value={form.is_available}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                </div>
            </>
            )}
          {form.role === "recipient" && (
            <>
                <div>
                <label className="block mb-2 font-medium">
                    Required Blood Group
                </label>

                <select
                    name="required_blood"
                    value={form.required_blood}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                </div>

                <div>
                <label className="block mb-2 font-medium">
                    Hospital Name
                </label>

                <input
                    type="text"
                    name="hospital_name"
                    value={form.hospital_name}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                </div>
            </>
            )}

      
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Register
          </button>
          <p>Already have an account?</p>
          <Link to="/"> Login</Link>
        </form>
      </div>
    </div>
  );
}