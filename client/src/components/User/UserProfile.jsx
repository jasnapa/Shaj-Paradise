import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { userProfile } from "../../Services/userApi";



function UserProfile() {
    const[profile,setProfile]=useState([])

 useEffect(() => { 
    try {
      (async function () {
        const { data } = await userProfile();
        console.log(data,"jjjj")
        if (data.success) {
          setProfile(data.profile);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!profile) {
    return <p>Loading...</p>;
  }


    return (
        <>
        <Navbar />
        { profile.map((item,key) =>(
            <div key={item._id} className="flex items-center h-screen w-full justify-center">
        <div className="flex items-center h-screen w-full justify-center">
            <div className="max-w-xs">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                        <img className="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{item.name}</h3>
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
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                    <td className="px-2 py-2">{item.mobile}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                    <td className="px-2 py-2">{item.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center my-3">
                            <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
        )}
        </>
    );
};

export default UserProfile;
