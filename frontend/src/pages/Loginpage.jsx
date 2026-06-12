import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Donor from "./Donor/Donor";
import Recipient from "./Recipient/Recipient";

export default function Login() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError,setGeneralError]=useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        if(data.non_field_errors){
          setGeneralError(data.non_field_errors);
        }else{
        setErrors(data);
        
      } 
      return;
    }
       
        if (data.access) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("role", data.user.role);
        }

        if (data.user.role == "donor") {
          navigate("donor/");
        } else if (data.user.role == "recipient") {
          navigate("recipient/");
        }
      
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Login!</h2>
        {generalError &&(
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {generalError}
              </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              <p className="text-red-500 text-sm">{errors.email[0]}</p>
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
              <p className="text-red-500 text-sm">{errors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>Don't have account?</p>
          <Link to="register/">Register</Link>
        </form>
      </div>
    </div>
  );
}
