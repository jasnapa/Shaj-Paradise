import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addPackage } from "../../../Services/vendorApi";





function ModalVendor(props){

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleModal = () => {
        setIsOpen(!isOpen);
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
        amount: '',
        daysInfo: '',
        amenities:'',
        },


        onSubmit: async (values) => {
            try {
                console.log("hjghjgh");
                const response = await addPackage(values)
                const data = response.data;
                console.log(data);
                if(data.status) {
                    toast.success(data.message, {
                        position: "top-center"
                    })
                    navigate("/vendor/package")                   
                }   
                 else {
                    toast.error(data.message, {
                        position: "top-center"
                    })
                }

            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",

                })
                console.log(error);
            }
        }
    })




    return(
        <>
        <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-12 mb-8 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                            Add Package
                        </h3>
                        <form onSubmit={formik.handleSubmit} className="px-8 space-y-6" >
                            <div>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                                    name="daysInfo"
                                    id="daysInfo"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter your days detail"
                                    onChange={formik.handleChange}
                                    required
                                />
                                {/* {formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-500' >{formik.errors.email}</div>
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
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                    Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </>
);
};

export default ModalVendor