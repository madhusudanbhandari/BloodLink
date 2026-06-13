import React, { useState, useEffect } from "react";

export default function Donor() {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access");

    fetch("http://127.0.0.1:8000/api/donor_donation_requests/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  useEffect(() => {
    const access = localStorage.getItem("access");

    fetch("http://127.0.0.1:8000/api/myprofile/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);


  const updateStatus = async (id, status) => {
    const access = localStorage.getItem("access");

    const response = await fetch(
      `http://127.0.0.1:8000/api/donation_request/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ status }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req)),
      );
    } else {
      alert(data.error || "Failed to update");
    }
  };

  const getStatusColor = (status) => {
    if (status === "accepted") return "text-green-600 bg-green-100";
    if (status === "rejected") return "text-red-600 bg-red-100";
    return "text-yellow-600 bg-yellow-100";
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === "high") return "text-red-600";
    if (urgency === "medium") return "text-orange-500";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="flex flex-col items-center text-center mb-10">
        <div className="text-gray-500">Welcome!</div>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {user.username}
        </h2>

        <span className="mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold capitalize">
          {user.role}
        </span>
      </div>

    
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Blood Requests</h2>

   
      <div className="space-y-5">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
             <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-red-600">
                {req.blood_group}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  req.status,
                )}`}
              >
                {req.status.toUpperCase()}
              </span>
            </div>

           
            <div className="grid md:grid-cols-2 gap-3 text-gray-700">
              <p>
                <span className="font-semibold">Recipient:</span>{" "}
                {req.recipient_username}
              </p>

              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {req.contact_num}
              </p>

              <p>
                <span className="font-semibold">Location:</span> {req.location}
              </p>

              <p>
                <span className="font-semibold">Hospital:</span> {req.hospital}
              </p>

              <p>
                <span
                  className={`font-semibold ${getUrgencyColor(req.urgency)}`}
                >
                  Urgency: {req.urgency}
                </span>
              </p>
            </div>

         
            {req.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(req.id, "accepted")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(req.id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
