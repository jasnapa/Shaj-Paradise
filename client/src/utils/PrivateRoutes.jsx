import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, Link, Navigate, Outlet } from "react-router-dom";
import { authVendor } from "../Services/vendorApi.js";


const PrivateRoutes = ({ role, route }) => { 

    const [auth,setAuth] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(role == 'admin'){
            authAdmin().then((response)=>{
                setAuth(response.data.status)
            }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/admin/login');
              })
        }
        else if(role == 'user'){
            authUser().then((response)=>{
                setAuth(response.data.status)
            }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/login');
              })
        }
        else if(role == 'vendor'){
            authVendor().then((response)=>{
                setAuth(response.data.status)
                console.log(response.data)
            }).catch((response) => {
                toast.error(response.message , { position :"top-center" })
                setAuth(response.data?.status)
                navigate('/vendor/login');
              })
        }
    },[])



if( auth == null) return 

return (
  auth ? <Outlet/> : <Navigate to={route} />
)

}
export default PrivateRoutes