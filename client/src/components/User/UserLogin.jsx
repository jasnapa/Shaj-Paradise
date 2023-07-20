import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import resort1 from './assets/resort1.jpg'
import { toast } from "react-toastify";



function UserLogin(){
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState("")
    const navigate = useNavigate()
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const generateError = (err) => {
        toast.error(err, {
            position: "top-center",
        })
    };


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                const { data } = await axios.post('/login', {...values})
                console.log(data);
                if (data.err || data.error) {
                    generateError(data.message)
                }
                if (data.login) {


                    // dispatch(
                    //   setUserDetails({
                    //     name: data.user.firstname,
                    //     id: data.user._id,
                    //     email: data.user.email, 
                    //     image : data.user.picture,
                    //     token : data.token

                    //   })
                    // );

                    navigate("/home")
                }
                 
            } catch (error) {

                console.log(error);
            }

        },
    });


    
    return(
         <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

                <div className="md:w-1/2 px-16">
                    <h2 className='font-bold text-3xl text-[#002D74]'>Login</h2>
                    <p className='text-sm mt-4 text-[#002D74]'>Welcome Back!</p>

                    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                        <input className='p-2 mt-8 rounded-xl border' onChange={formik.handleChange} type="email" name="email" placeholder='Email' id="" required />
                        <div className="relative">
                            <input className='p-2  rounded-xl border w-full' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required />
                            <button type="button" onClick={handleTogglePassword}>
                            <svg className="w-5 absolute top-1 right-3 translate-y-1/2 h-4 text-gray-500" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                                </g>
                            </svg></button>
                        </div>
                        <button className='bg-[#002D74] rounded-xl py-2 mt-2 text-white hover:scale-105 duration-300' type="submit">Login</button>
                    </form>
                    <div className='mt-10 grid-cols-3 items-center text-gray-500'>
                        <hr className=' text-gray-500' />
                        <p className='text-center text-sm'>OR</p>
                        <hr className=' text-gray-500' />
                    </div>

                    <button className='hover:scale-105 duration-300 bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm font-semibold'><svg
                        className="mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="25px"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                    </svg>Login with Google</button>
                    {/* <p className='mt-5 text-xs border-b py-4'>Forget your password</p> */}

                    <div className='mt-3 text-xs flex justify-between items-center'>
                        <p>Not a member yet !?</p>
                        <a href='/signup' className='hover:scale-105 duration-300 py-2 px-5 bg-white border rounded-xl'>Register</a>
                    </div>

                </div>

                <div className="w-1/2 md:block hidden">
                    <img className=' rounded-2xl' src={resort1} alt="" />
                </div>
            </div>
        </section> 
    )
}

export default UserLogin