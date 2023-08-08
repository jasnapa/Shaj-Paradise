import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import resort3 from "../User/assets/resort3.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { authVendor } from "../../Services/vendorApi";
import { setVendorDetails } from "../../redux/Features/vendorSlice";
import { useDispatch } from "react-redux";

function VendorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    authVendor().then((response) => {
      console.log(response);
      if (response.data.status) 
      {
        navigate("/vendor/home");
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
        const { data } = await axios.post("/vendor/login", { ...values });
        console.log(data);

        if (data.login) {
            
          dispatch(
            setVendorDetails({
              name: data.vendor.vendorName,
              id: data.vendor._id,
              email: data.vendor.email, 
              mobile : data.vendor.mobile,
            })
          );
          localStorage.setItem("VendorJwtKey", data.token);
          navigate("/vendor/home");
        } else if (data.error) {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">Welcome Back!</p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              onChange={formik.handleChange}
              type="email"
              name="email"
              placeholder="Email"
              id=""
              required
            />
            <div className="relative">
              <input
                className="p-2  rounded-xl border w-full"
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <button onClick={handleTogglePassword} type="button">
                <svg
                  className="w-5 absolute top-1 right-3 translate-y-1/2 h-4 text-gray-500"
                  ariaHidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 14"
                >
                  <g
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                  </g>
                </svg>
              </button>
            </div>
            <button
              className="bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-10 grid-cols-3 items-center text-gray-500">
            <hr className=" text-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className=" text-gray-500" />
          </div>
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>Not a member yet !?</p>
            <Link to={"/vendor/signup"}>
              <a className="hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl">
                Register
              </a>
            </Link>
          </div>
        </div>

        <div className="w-1/2 md:block hidden">
          <img className=" rounded-2xl" src={resort3} alt="" />
        </div>
      </div>
    </section>
  );
}

export default VendorLogin;
