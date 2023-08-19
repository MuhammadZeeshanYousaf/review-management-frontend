import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import authConfig from "@/configs/authConfig";
import Link from "next/link";

const LoginPage = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    user: {
      email: "",
      password: "",
    },
  });

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
    auth.login(formData);
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-800 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 border rounded-md placeholder-gray-400 text-black"
              placeholder="Enter your email"
              onChange={handleChange}
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
              className="w-full p-2 border rounded-md placeholder-gray-400 text-black"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          Not an Account? &nbsp;
          <Link href={authConfig.signUpEndpoint} className="text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
