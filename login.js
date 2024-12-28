import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../../config";
import axios from "axios";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUserInfo } from "../../store"; // Import your action to set the user
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(`${SERVER_URL}/api/login`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          toast.success("Login successful");

          dispatch(setUserInfo(formData.username));


          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          if (window.confirm('User not found')) {
            toast.success("User not found");
            navigate('/signup');
          }
        } else if (error.response?.status === 401) {
          alert('Invalid credentials. Please try again.');
        } else {
          alert('An unexpected error occurred.');
        }
      }
    } else {
      setErrors(formErrors);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full bg-[#0F0F0F] text-white bg-cover font-manrope">
      <Toaster
      />
      <div className="min-h-screen flex flex-col lg:flex-row lg:overflow-hidden">
        <div className="w-[100%] lg:w-[50%] bg-[#151515] flex items-center justify-center">
          <div><img src="/assets/Logo/mobilelogo.svg"></img></div>
        </div>
        <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-center py-10 lg:py-0">
          <div>
            <p className=" font-medium text-3xl ">Login</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-5 w-[90%] md:w-[50%] mx-auto rounded-lg "
          >
            <div className="mb-4">
              <label className="block text-sm font-medium ">
                User Name*
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#707070] outline-none"
              />
              {errors.username && (
                <span className="w-full text-red-500 text-sm">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium ">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#707070] outline-none"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-[50%] -translate-y-[50%] cursor-pointer text-black"
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye fa-sm"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash fa-sm"></i>
                  )}
                </span>
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>
            </div>

            <div className="w-full flex justify-center mt-5">
              <button
                type="submit"
                className="bg-secondary font-medium text-sm  py-1.5 px-5 rounded-md hover:bg-opacity-85"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
