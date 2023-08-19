import React, { useState, useEffect } from "react";
import authConfig from "@/configs/authConfig";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: "",
      password: "",
    },
  });
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    auth.signup(formData);
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="m-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-medium text-gray-800 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-800 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md placeholder-gray-400"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block font-medium text-gray-800 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md placeholder-gray-400"
                placeholder="Choose a password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-3 text-center">
            Already have Account? &nbsp;
            <Link href={authConfig.loginEndpoint} className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
