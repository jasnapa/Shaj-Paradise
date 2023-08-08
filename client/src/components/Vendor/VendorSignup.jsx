import React, { useState } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import resort4 from "../User/assets/resort4.jpg";

function VendorSignup() {
 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = Yup.object({
    vendorName: Yup.string()
      .max(35, "Must be 35 characters or less")
      .required("Resort Name Required"),
    email: Yup.string()
      .email("invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .max(10, "Mobile number not valid")
      .min(10, "Mobile number not valid")
      .required("Mobile is required"),

    password: Yup.string()
      .min(6, "password must be at least 6 charecters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      vendorName: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: "",
    },

    validationSchema: validate,

    onSubmit: async (values) => {
      try {
        const response = await axios.post("/vendor/add", { ...values });
        const data = response.data;
        console.log(response);
        if (data.status) {
          toast.success(data.message, {
            position: "top-center",
          });
          navigate("/vendor/login");
        } else {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
        console.log(error);
      }
    },
  });

  const handleChange = (event) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[event.target.name] = event.target.value;
      return formFields;
    });
  };

  return (
    <Formik>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 my-3 flex rounded-2xl shadow-lg max-w-6xl p-5 items-center">
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-3xl text-[#002D74]">
              Register Here..
            </h2>
            <p className="text-sm mt-4 text-[#002D74]">
              Lets Start Your Journey!
            </p>
            {/* {errorMessage ? <div className="text-red-500 pb-6 text-center ">{errorMessage}</div> : ""} */}

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="vendorName"
                placeholder="vendor Name"
                id="vendorName"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {formik.touched.vendorName && formik.errors.vendorName ? (
                <div className="text-red-500"> {formik.errors.vendorName} </div>
              ) : null}

              <input
                className="p-2 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}

              <input
                className="p-2 rounded-xl border"
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                id="mobile"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-red-500"> {formik.errors.mobile} </div>
              ) : null}
              <div>
          
              </div>
              <div className="relative">
                <input
                  className="p-2  rounded-xl border w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
                <button type="button" onClick={handleTogglePassword}>
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
                  </svg>{" "}
                </button>
              </div>
              <input
                className="p-2  rounded-xl border w-full"
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className="text-red-500">
                  {formik.errors.confirmpassword}
                </div>
              ) : null}
              <button
                className="bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300"
                type="submit"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-5 text-xs flex justify-between items-center">
              <p>Already a member !?</p>
              <Link to={"/vendor/login"}>
                <a className="hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl">
                  login
                </a>
              </Link>
            </div>
          </div>

          <div className="w-1/2 h-fit md:block hidden">
            <img className=" rounded-2xl" src={resort4} alt="" />
          </div>
        </div>
        <ToastContainer />
      </section>
    </Formik>
  );
}

export default VendorSignup;
