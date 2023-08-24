import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addResort, editResort } from "../../../Services/vendorApi";
import ClipLoader from "react-spinners/ClipLoader";


function EditModal(props) {
  const [Location, setLocation] = useState([]);
  const [suggestions, setSuggest] = useState([]);
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const refresh = props.refresh;
  const editMode = props.editMode;
  const resort = props.resort;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRetrieve = (itemLocation, place) => {
    setLocation(itemLocation);
    setPlace(place);
  };

  const handleChange = async (e) => {
    setValue(e.target.value);

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=pk.eyJ1Ijoic2hhanBhcmFkaXNlLTEyMyIsImEiOiJjbGt3djVieXExYWRyM3BwcDB1eTQ5NjF2In0.qO4fld59j3Og7WhdT6gzHw`
    );

    if (response.ok) {
      const { features } = await response.json();
      setSuggest(features);
    }
  };

  const validate = Yup.object({
    resortName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Resort Name Required"),
    description: Yup.string().required("Description Required"),
    capacity: Yup.string().required("Capacity Required"),
    amount: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Amount Required"),
  });

  
  
  const formik = useFormik({
    initialValues: {
      resortName: resort.resortName,
      description: resort.description,
      capacity: resort.capacity,
      place: resort.place,
      amount: resort.amount,
      amenities: resort.amenities,
      Images: resort.images || [],
    },

    validationSchema: validate,

    onSubmit: async (values) => {
      try {
        setLoading(true);

        const finalLocation = value ? Location : resort.locations;
        const finalPlace = formik.values.place ?  formik.values.place : place;
        // const finalImages = formik.values.Images ?  formik.values.Images : selectedImages;
        
        const { data } = await editResort(
          values,
          selectedImages,
          finalLocation,
          finalPlace,
          resort._id
        );
        console.log(data);
        if (data?.success) {
          setLoading(false);
          toast.success(data.message, {
            position: "top-center",
          });
          props.setRefresh(!refresh);
          toggleModal();
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
        Edit
      </button>

      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="  z-50 flex card align-middle items-start justify-center h-fit"
        >
          <div className="absolute card  self-center mb-10 bg-white rounded-lg shadow dark:bg-gray-700">
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
                Edit Resort
              </h3>
              <form onSubmit={formik.handleSubmit} className="px-8 space-y-6">
                <div>
                  <input
                    type="text"
                    name="resortName"
                    id="resortName"
                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={formik.values.resortName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.resortName && formik.errors.resortName ? (
                    <div className="text-red-500">
                      {formik.errors.resortName}
                    </div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="mt-5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="capacity"
                    id="capacity"
                    className="mt-5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={formik.values.capacity}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.capacity && formik.errors.capacity ? (
                    <div className="text-red-500">{formik.errors.capacity}</div>
                  ) : null}
                </div>
                <div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="mt-5 bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div className="text-red-500"> {formik.errors.amount} </div>
                  ) : null}
                </div>
                <div>
                  <input
                    className="input input-bordered"
                    onChange={handleChange}
                    value={value || formik.values.place}
                    onFocus={() => setPlace("")}
                    required
                  />
                  <ul className="absolute bg-white w-56">
                    {!place &&
                      suggestions.map((item) => {
                        return (
                          <li
                            onClick={() =>
                              handleRetrieve(
                                item.geometry.coordinates,
                                item.place_name
                              )
                            }
                            className="text-start cursor-pointer hover:bg-slate-100"
                          >
                            {item.place_name}
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div>
                  <input
                    type="text"
                    name="amenities"
                    id="amenities"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={formik.values.amenities}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.amenities && formik.errors.amenities ? (
                    <div className="text-red-500">
                      {formik.errors.amenities}
                    </div>
                  ) : null}
                </div>

                <input
                  type="file"
                  className="file-input file-input-ghost w-full mt-7 mb-10 max-w-xs"
                  onChange={handleFileChange}
                  multiple
                  
                /><div className="flex justify-between">
                {formik.values.Images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Selected ${index}`}
                    className="selected-image h-20 w-20"
                  />
                ))}</div>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <button
                    type="submit"
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    {loading ? (
                      <ClipLoader
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      "Edit"
                    )}
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

export default EditModal;
