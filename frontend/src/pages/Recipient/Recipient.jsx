import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Recipient() {
  const [list, setList] = useState([]);
  const [selectedBlood, setSelectedBlood] = useState(null);
  const [form, setForm] = useState({
    contact_num: "",
    urgency: "",
    location: "",
    hospital: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const access = localStorage.getItem("access");

    const fetchlist = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/seeblood/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.json();
      setList(data);
    };
    fetchlist();
  }, []);
  const openModal = (li) => {
    setSelectedBlood(li);
  };
  const closeModal = () => {
    setSelectedBlood(null);
    setForm({
      contact_num: "",
      urgency: "medium",
      location: "",
      hospital: "",
    });
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    const access = localStorage.getItem("access");

    const response = await fetch(
      "http://127.0.0.1:8000/api/request_donation/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          available_blood: selectedBlood.id,
          contact_num: form.contact_num,
          urgency: form.urgency,
          location: form.location,
          hospital: form.hospital,
        }),
      },
    );
    const data = await response.json();

    if (response.ok) {
      alert("Request sent successfully");
      closeModal();
    } else {
      alert(data.error || "Failed to send request");
      console.log("error:", data);
    }
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const access = localStorage.getItem("access");

    const fetchUser = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/myprofile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const access = localStorage.getItem("access");

    fetch("http://127.0.0.1:8000/api/recipient_donation_response/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setResponse(data));
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <br />
        <br />
        <p>Welcome</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {user.username}
        </h2>

        <span className="mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-semibold capitalize">
          {user.role}
        </span>
      </div>
      <br />
      <br />
      <h2 className="text-3xl font-bold text-center mn-8">Available Blood</h2>

      <div className="grid gap-4">
        {list.map((li) => {
         
          const responseStatus = response.find(
            (rep) => rep.available_blood === li.id,
          );

          return (
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

                  <p className="text-gray-600 mt-1">{li.location}</p>

                  <p className="text-gray-500 text-sm mt-1">{li.contact}</p>

                  {responseStatus && (
                    <p className="mt-2">
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          responseStatus.status === "accepted"
                            ? "text-green-600 font-semibold"
                            : responseStatus.status === "rejected"
                              ? "text-red-600 font-semibold"
                              : "text-yellow-600 font-semibold"
                        }
                      >
                        {responseStatus.status}
                      </span>
                    </p>
                  )}
                </div>

               
                <div className="text-right">
                  <button
                    onClick={() => openModal(li)}
                    disabled={responseStatus}
                    className={`mt-5 px-3 py-2 rounded-lg text-white ${
                      responseStatus
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {responseStatus ? "Request Sent" : "Request Blood"}
                  </button>

                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Units Available</p>
                    <p className="text-xl font-bold text-gray-800">
                      {li.units_available}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedBlood && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">
              Request {selectedBlood.blood_group} Blood
            </h2>

            <form onSubmit={sendRequest} className="space-y-3">
              <input
                type="text"
                name="contact_num"
                placeholder="Contact Number"
                className="w-full border p-2 rounded"
                value={form.contact_num}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Your Location"
                className="w-full border p-2 rounded"
                value={form.location}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="hospital"
                placeholder="Hospital Name"
                className="w-full border p-2 rounded"
                value={form.hospital}
                onChange={handleChange}
                required
              />

              <select
                name="urgency"
                className="w-full border p-2 rounded"
                value={form.urgency}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Send Request
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
