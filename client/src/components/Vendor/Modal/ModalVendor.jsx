import { SearchBox } from "@mapbox/search-js-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addResort } from "../../../Services/vendorApi";
import axios from "axios";

function ModalVendor(props) {
  const [Location, setLocation] = useState([]);
  const [suggestions, setSuggest] = useState([]);
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  console.log(Location);

  const handleRetrieve = (itemLocation,place) => {
    setLocation(itemLocation)
    setPlace(place)
    console.log('sjhjsd',Location);
    console.log('sjhjsd',place);
  }; 

  const handleChange = async (e) => {
    setValue(e.target.value);

    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1Ijoic2hhanBhcmFkaXNlLTEyMyIsImEiOiJjbGt3djVieXExYWRyM3BwcDB1eTQ5NjF2In0.qO4fld59j3Og7WhdT6gzHw`)
    if (response.ok) {
      const {features} = await response.json();
      setSuggest(features);
    }
  };

  // const validate = Yup.object({

  //     amount: Yup.string()
  //         .max(15, 'Must be 15 characters or less')
  //         .required('amount Required'),
  //     daysInfo: Yup.string()
  //         .max(15, 'Must be 15 characters or less')
  //         .required('First Name Required'),
  //     amenities: Yup.string()
  //         .max(15, 'Must be 15 characters or less')
  //         .required('First Name Required'),
  // });

  const formik = useFormik({
    initialValues: {
      resortName: "",
      description: "",
      amount: "",
      amenities: "",
    },

    onSubmit: async (values) => {
      try {
        const { data } = await addResort(
          values,
          selectedImages,
          Location,
          place
        );
        console.log(data);
        if (data.status) {
          toast.success(data.message, {
            position: "top-center",
          });
          navigate("/vendor/resorts");
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

  const handleFileChange = (e) => {
    const files = e.target.files;
    const imageList = Array.from(files);
    const isValidImages = imageList.every((file) => isValidFileUploaded(file));

    if (isValidImages) {
      Promise.all(imageList.map(convertToBase64))
        .then((base64Images) => setSelectedImages(base64Images))
        .catch((error) =>
          console.log("Error converting images to base64:", error)
        );
    } else {
      console.log("Invalid File type");
    }
  };

  const isValidFileUploaded = (file) => {
    const validExtensions = ["jpg", "png", "jpeg", "gif", "webp"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-accent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-12 mb-8 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleModal}
      >
        Add New
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-8 py-6 text-center lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add Resort
              </h3>
              <form onSubmit={formik.handleSubmit} className="px-8 space-y-6">
                <div>
                  <input
                    type="text"
                    name="resortName"
                    id="resortName"
                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="resort Name"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="mt-5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Description"
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="mt-5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Total amount"
                    onChange={formik.handleChange}
                    required
                  />
                  {/* {
                                    formik.touched.name && formik.errors.name ? (
                                        <div className="text-red-500"> {formik.errors.name} </div>
                                    ) : null} */}
                </div>

                <div>
                  <input
                    type="text"
                    name="amenities"
                    id="amenities"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Amenities"
                    onChange={formik.handleChange}
                    required
                  />
                  {/* {formik.touched.mobile && formik.errors.mobile ? (
                                    <div className="text-red-500"> {formik.errors.mobile} </div>
                                ) : null} */}
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    value={place ? place : value}
                    placeholder="Select your Location"
                    onFocus={()=>setPlace('')}
                  />
                  <ul>
                    {!place &&
                      suggestions.map((item) => {
                        return (
                          <li onClick={()=>handleRetrieve(item.geometry.coordinates , item.place_name)} className="text-start ">
                            {item.place_name}
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <input
                  type="file"
                  className="file-input file-input-ghost w-full mt-7 mb-10 max-w-xs"
                  onChange={handleFileChange}
                  multiple
                />
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <button
                    type="submit"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalVendor;
