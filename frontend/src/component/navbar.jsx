import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const role = localStorage.getItem("role");

    const navItems = {
        donor: [
            { name: "Available Blood", path: "/available" },
            { name: "List Blood", path: "/listblood" },
        ],
        recipient: [
            { name: "My Requests", path: "/myrequests" },
            { name: "Make Request", path: "/makerequests" },
        ],
    };

    return (
        <nav className="bg-red-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-white tracking-wide"
                    >
                        ❤️ BloodLink
                    </Link>

                    
                    <div className="flex items-center gap-3">

                        <NavLink
                            to="/myprofile"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg transition duration-200 ${
                                    isActive
                                        ? "bg-white text-red-600 font-semibold"
                                        : "text-white hover:bg-red-500"
                                }`
                            }
                        >
                            My Profile
                        </NavLink>

                        {navItems[role]?.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg transition duration-200 ${
                                        isActive
                                            ? "bg-white text-red-600 font-semibold"
                                            : "text-white hover:bg-red-500"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }}
                            className="ml-3 bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}