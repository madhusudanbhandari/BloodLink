import React, { useState } from "react";
import { useEffect } from "react";

export default function Request() {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access");

    const fetchRequest = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/seerequest", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await response.json();
      setRequest(data);
    };
    fetchRequest();
  }, []);

  const [offer, setOffer] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access");

    const fetchOffer = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/donation_offer/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      );
      const data = await response.json();
      setOffer(data);
      console.log(data);
    };
    fetchOffer();
  }, []);

  return (
    <div>
      <br />
      <br />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
        My Blood Requests
      </h2>

      <div className="grid gap-4">
        {request.map((req) => {
          const matchedOffer = offer.find((o) => o.request === req.id);

          return (
            <div key={req.id} className="bg-white shadow-md rounded-xl p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-red-600">
                    {req.blood_group}
                  </h3>

                  <p>🏥 {req.hospital_name}</p>
                  <p>📍 {req.hospital_address}</p>

                  {matchedOffer && (
                    <p className="text-sm font-semibold text-blue-600">
                      Donor Response:{" "}
                      {matchedOffer.status
                        ? ` ${matchedOffer.donor_username} Wants to Donate ❤️ Contact `
                        : "Pending"}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Units Required</p>
                  <p className="text-xl font-bold">{req.units_required}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
