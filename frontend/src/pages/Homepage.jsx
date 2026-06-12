import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">

            
            <section className="bg-gradient-to-r from-blue-400 to-red-400 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        <div>
                            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                                Connecting Donors with Those in Need
                            </span>

                            <h1 className="mt-6 text-5xl font-bold leading-tight">
                                Every Drop Counts.
                                <br />
                                Save Lives with BloodLink.
                            </h1>

                            <p className="mt-6 text-lg text-red-100">
                                BloodLink is a platform that bridges the gap
                                between blood donors and recipients. Find
                                compatible donors quickly, manage requests
                                efficiently, and become part of a community
                                dedicated to saving lives.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/register"
                                    className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
                                >
                                    Join BloodLink
                                </Link>

                                <Link
                                    to="/login"
                                    className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>

                       
                        <div className="flex justify-center">
                            <div className="bg-white/10 backdrop-blur rounded-3xl p-10 shadow-2xl text-center">
                                <div className="text-7xl">🩸</div>

                                <h3 className="mt-4 text-2xl font-bold">
                                    Be Someone's Lifeline
                                </h3>

                                <p className="mt-2 text-red-100">
                                    A single donation can help save multiple
                                    lives.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

       
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Why BloodLink?
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Finding blood during emergencies can be stressful and
                        time-sensitive. BloodLink simplifies the process by
                        connecting donors and recipients through a secure,
                        accessible, and user-friendly platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-14">

                    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
                        <div className="text-4xl">🔍</div>

                        <h3 className="mt-4 text-xl font-semibold">
                            Find Blood Quickly
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Search for available donors based on blood group
                            and location during emergencies.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
                        <div className="text-4xl">🤝</div>

                        <h3 className="mt-4 text-xl font-semibold">
                            Connect Communities
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Encourage people to donate and support patients
                            who urgently need blood.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
                        <div className="text-4xl">🔒</div>

                        <h3 className="mt-4 text-xl font-semibold">
                            Secure & Reliable
                        </h3>

                        <p className="mt-3 text-gray-600">
                            User authentication and role-based access ensure
                            trusted interactions.
                        </p>
                    </div>

                </div>
            </section>

     
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">
                            How BloodLink Works
                        </h2>

                        <p className="mt-4 text-gray-600">
                            A simple process designed for both donors and recipients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-14">

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold">
                                1
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Create an Account
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Register as a donor or recipient and complete
                                your profile.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold">
                                2
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Connect & Request
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Search for blood availability or create blood
                                requests during emergencies.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold">
                                3
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Save Lives
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Coordinate donations efficiently and help
                                patients receive timely support.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

         
            <section className="bg-red-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">

                    <h2 className="text-4xl">
                        Become Part of the Lifesaving Network
                    </h2>

                    <p className="mt-4 text-red-100">
                        Whether you are willing to donate or searching for
                        help, BloodLink is here to connect people when every
                        minute matters.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">

                        <Link
                            to="/register"
                            className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition"
                        >
                            Sign In
                        </Link>

                    </div>

                </div>
            </section>

       
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

                    <div>
                        <h3 className="text-xl font-bold text-white">
                            BloodLink
                        </h3>

                        <p className="mt-2 text-sm">
                            Connecting donors and recipients through technology.
                        </p>
                    </div>

                    <p className="text-sm mt-4 md:mt-0">
                        © Madhusudan Bhandari
                    </p>

                </div>
            </footer>

        </div>
    );
}