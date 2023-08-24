import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { saveProfile, userProfile } from "../../Services/userApi";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function UserProfile() {
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.user);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("name Required"),
    mobile: Yup.string()
      .max(10, "Mobile number not valid")
      .min(10, "Mobile number not valid")
      .required("mobile Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: profile.name,
      mobile: profile.mobile,
    },
    validationSchema: validate,

    onSubmit: async (values) => {
      try {
        console.log(values, "ghjghgjh");
        const { data } = await saveProfile(values);
        if (data.success) {
          setRefresh(!refresh);
          setEdit(false);
          toast.success(data.message, {
            position: "top-center",
          });
        } else {
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
    <>
      <Navbar edit={edit} refresh={refresh} />
      {!edit ? (
        <div className="flex items-center h-screen w-full py-11 justify-center">
          <div className="max-w-xs">
            <div className="bg-white card shadow-xl rounded-lg p-20">
              <div className="photo-wrapper p-2">
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src="https://source.unsplash.com/100x100/?portrait"
                  alt="John Doe"
                />
              </div>
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                  {profile.name}
                </h3>
                {/* <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>Web Developer</p>
                        </div> */}
                <table className="text-xs my-3">
                  <tbody>
                    {/* <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                    <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                </tr> */}
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Phone
                      </td>
                      <td className="px-2 py-2">{profile.mobile}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Email
                      </td>
                      <td className="px-2 py-2">{profile.email}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center my-3">
                  <a
                    className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                    onClick={() => setEdit(true)}
                  >
                    Edit Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        formik.values && (
          <div className="flex items-center h-screen w-full py-11 justify-center">
            <div className="max-w-xs">
              <div className="bg-white card shadow-xl rounded-lg p-20">
                <div className="photo-wrapper p-2">
                  <img
                    className="w-32 h-32 rounded-full mx-auto"
                    src="https://source.unsplash.com/100x100/?portrait"
                    alt="John Doe"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {profile.name}
                  </h3>
                  {/* <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>Web Developer</p>
                        </div> */}
                  <form onSubmit={formik.handleSubmit}>
                    <table className="text-xs my-3">
                      <tbody>
                        {/* <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                    <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                </tr> */}
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Name
                          </td>
                          <td className="px-2 py-2">
                            <input
                              className="input-xs"
                              onChange={formik.handleChange}
                              type="text"
                              name="name"
                              value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="text-red-500">
                                {" "}
                                {formik.errors.name}{" "}
                              </div>
                            ) : null}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Mobile
                          </td>
                          <td className="px-2 py-2">
                            <input
                              className="input-xs"
                              onChange={formik.handleChange}
                              type="number"
                              name="mobile"
                              value={formik.values.mobile}
                            />
                            {formik.touched.mobile && formik.errors.mobile ? (
                              <div className="text-red-500">
                                {" "}
                                {formik.errors.mobile}{" "}
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center my-3">
                      <button
                        className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                        type="submit"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default UserProfile;
