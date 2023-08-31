import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  console.log(email, "jhgf");

  const [timer, setTimer] = useState(60);
  const [btnDisabled,setbtnDisabled] = useState(true)

  const formik = useFormik({
    initialValues: {
      otp: "",
    },

    // validationSchema:validate,

    onSubmit: async (values) => {
      console.log("onsubmit");
      try {
        console.log(values, "nsdksdk");
        const { data } = await axios.post("/user/signup", { ...values });
        console.log(data);
        if (data.status) {
          navigate("/login");
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setbtnDisabled(false)
    }
  }, [timer]);

  const handleResend = async () => {
    const { data } = await axios.post("/user/verify", { email });
    if (data.status) {
      toast.success(data.message, {
        position: "top-center",
      });
    } else {
      toast.error(data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="h-screen bg-white-500 py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white  card h-fit shadow-xl py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received</span>
                <span className="text-green-700">
                  Otp has been send to : {email}
                </span>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <input
                    className="m-2 input input-sm input-bordered border text-center form-control "
                    type="text"
                    name="otp"
                    id="first"
                    onChange={formik.handleChange}
                  />
                  {/* <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" name="otp" id="second" maxLength="1" onChange={handleChange} />
                      <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" name="otp" id="third" maxLength="1" onChange={handleChange} />
                      <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" name="otp" id="fourth" maxLength="1" onChange={handleChange} /> */}
                </div>

                <div className="flex justify-center text-center ">
                  <a className="flex flex-col w-full items-center text-neutral-600 cursor-pointer">
                    <div className="w-full flex mt-4 justify-around">
                      <span className="countdown">
                       Time remaining:  <span style={{ "--value": timer }}></span>
                      </span>
                      <button
                        type="button"
                        onClick={handleResend}
                        className={btnDisabled ?  'text-gray-300 underline ml-20' : 'underline ml-20'} disabled={btnDisabled}
                      >
                        Resend OTP
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="text-white btn mt-4 p-2 btn-success"
                    >
                      Submit OTP
                    </button>
                    <i className="bx bx-caret-right ml-1"></i>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
